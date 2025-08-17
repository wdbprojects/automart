import { bcryptPasswordHash } from "@/lib/bcrypt";
import { PrismaClient } from "@prisma/client";

export const seedAdmin = async (prisma: PrismaClient) => {
  const password = await bcryptPasswordHash("asdfasdf");
  const admin = await prisma.user.create({
    data: {
      email: "nata@slutty.com",
      hashedPassword: password,
    },
  });
  console.log("User created 🌱", admin);
  return admin;
};
