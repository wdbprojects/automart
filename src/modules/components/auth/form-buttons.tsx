"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { FaGoogle } from "react-icons/fa";

const FormButtons = ({
  reset,
  setIsVisible,
}: {
  reset: () => void;
  setIsVisible: (arg0: boolean) => void;
}) => {
  const { pending } = useFormStatus();

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <Button
        type="reset"
        variant="secondary"
        className="w-[50%] grow cursor-pointer"
        disabled={pending}
        size="sm"
        onClick={() => {
          reset();
          setIsVisible(false);
        }}
      >
        Reset form
      </Button>
      <Button
        variant="default"
        type="submit"
        disabled={pending}
        size="sm"
        className="w-[50%] grow text-white"
      >
        {pending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="size-3.5 animate-spin" />
            <span>Loading...</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span>Sign In</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default FormButtons;
