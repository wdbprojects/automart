"use client";

import { toast } from "sonner";
import { Button } from "../ui/button";

const Test = () => {
  return (
    <Button
      onClick={() => {
        toast.info("Test Sonner");
      }}
    >
      Test Sonner
    </Button>
  );
};
export default Test;
