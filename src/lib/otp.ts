import { env } from "@/env";
import { bcryptPasswordCompare, bcryptPasswordHash } from "@/lib/bcrypt";
import { redis } from "@/lib/redis-store";
import { resend } from "@/lib/resend";
import ChallengeEmail from "@/emails/challenge";
import { Challenge } from "@/config/types";
import prisma from "@/lib/prisma";

const REDIS_PREFIX = "otp";

// INFO: helper which issues a new 2fa challenge for user and sends them the code
// INFO: if there is an outstanding challenge, it just resends the code

export const issueChallenge = async (userId: string, email: string) => {
  const array = new Uint32Array(1);
  const code = (crypto.getRandomValues(array)[0] % 900000) + 100000;
  const hash = await bcryptPasswordHash(code.toString());
  const challenge = { codeHash: hash, email: email };
  await redis.setex(`${REDIS_PREFIX}:uid-${userId}`, 60 * 60, challenge);
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "ronyortizop@gmail.com",
    subject: `Sign in to ${env.NEXT_PUBLIC_APP_URL}`,
    html: `<p>${code}</p>`,
    react: ChallengeEmail({ data: { code } }),
  });

  if (error) {
    console.log({ error });
    throw new Error(`Error sending email: ${error.name} - ${error.message}`);
  }
};

// INFO: check whether a user supplied challenge code is correct, and if so update the session
export const completeChallenge = async (userId: string, code: string) => {
  const challenge = await redis.get<Challenge>(`${REDIS_PREFIX}:uid-${userId}`);
  if (challenge) {
    const isCorrect = await bcryptPasswordCompare(code, challenge.codeHash);
    if (isCorrect) {
      const session = await prisma.session.findFirst({
        where: {
          userId: userId,
          requires2FA: true,
        },
      });
      if (session) {
        await prisma.session.updateMany({
          where: {
            sessionToken: session.sessionToken,
            userId: userId,
          },
          data: {
            requires2FA: false,
          },
        });
        await redis.del(`${REDIS_PREFIX}:uid-${userId}`);
        return { success: true, message: "2FA enabled successfully" };
      }
      return {
        success: false,
        message: "Could not find the session for the user",
      };
    }
    return {
      success: false,
      message: "Incorrect verification code - please try again",
    };
  }
  return {
    success: false,
    message: "Challenge does not exist - please try again",
  };
};
