"use client";

import { signOutAction } from "@/app/_actions/sign-out";
import SignOutButton from "@/modules/components/auth/sign-out-button";

const SignOutForm = () => {
  return (
    <form action={signOutAction} className="space-y-4">
      <SignOutButton />
    </form>
  );
};

export default SignOutForm;
