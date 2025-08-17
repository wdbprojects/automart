import { auth } from "@/auth";
import OTPForm from "@/modules/components/auth/otp-form";

const ChallengeMain = async () => {
  return (
    <div className="flex w-full max-w-lg flex-col items-center justify-center">
      <h3 className="mb-4 text-center text-4xl lg:text-5xl">
        One Time Password
      </h3>
      <p className="text-muted-foreground mb-12 text-center">
        Enter the six digit code sent to your email address
      </p>
      <OTPForm />
    </div>
  );
};

export default ChallengeMain;
