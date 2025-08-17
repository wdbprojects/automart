import { z } from "zod";

export const SignInSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Enter a valid email" })
    .trim()
    .min(1, { message: "Email is a required field" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" })
    .min(8, { message: "At least 8 characters" })
    .max(20, { message: "Maximun 20 characters" }),
});
