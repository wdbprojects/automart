import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "A valid email is required" })
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, { message: "Password is required" })
    .max(32, { message: "Password must be at most 32 characters long" }),
});
