"use server";

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
      console.log(error);
      return { success: false, message: "Invalid Credentials" };
    }
    // signIn function from auth.ts here!!!
    return { success: true, message: "Signed in successfully" };
  } catch (err) {
    console.log(err);
    if (isRedirectError(err)) throw err;
    return { success: false, message: "Invalid Credentials" };
  }
};
