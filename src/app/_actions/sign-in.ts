"use server";

import { signIn } from "@/auth";
import { routes } from "@/config/routes";
import { PrevState } from "@/config/types";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { SignInSchema } from "@/app/schemas/auth.schema";

export const signInAction = async (_: PrevState, formData: FormData) => {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const { data, success, error } = SignInSchema.safeParse({
      email: email,
      password: password,
    });
    if (!success) {
      console.log({ error });
      return {
        success: false,
        message: "Invalid Credentials (sign-in.ts) -> !success",
      };
    }
    // signIn function from auth.ts
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: true,
      redirectTo: "/auth/challenge",
    });
    return { success: true, message: "Signed in successfully! sign-in.ts" };
  } catch (err) {
    console.log({ err });
    if (isRedirectError(err)) throw err;
    return { success: false, message: "Invalid credentials" };
  }
};
