"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SignOutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      variant="default"
      className="flex items-center gap-2 text-white"
      size="sm"
    >
      {pending && <Loader2 className="mr-2 size-4 animate-spin" />} Sign Out
    </Button>
  );
};

export default SignOutButton;
