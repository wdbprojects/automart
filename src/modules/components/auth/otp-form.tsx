"use client";

import { useEffect, useState, useTransition, ClipboardEvent } from "react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loader2, LoaderCircle, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { OneTimePasswordSchema, OtpSchemaType } from "@/app/schemas/otp-schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  completeChallengeAction,
  resendChallengeAction,
} from "@/app/_actions/challenge";
import { toast } from "sonner";
import { routes } from "@/config/routes";

const OTPForm = () => {
  const [sendButtonsText, setSendButtonsText] = useState("Send Code");
  const [isCodePending, startCodeTransition] = useTransition();
  const [isSubmitPending, startSubmitTransition] = useTransition();
  const router = useRouter();
  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(OneTimePasswordSchema),
    defaultValues: {
      code: "",
    },
  });
  const { handleSubmit, control } = form;
  const onSubmit: SubmitHandler<OtpSchemaType> = async (
    data: OtpSchemaType,
  ) => {
    startSubmitTransition(async () => {
      const result = await completeChallengeAction(data.code);

      if (!result.success) {
        toast.error(`Error: ${result.message}`);
      } else {
        console.log("second", { result });
        router.push(routes.admin.dashboard);
      }
    });
  };

  const sendCode = () => {
    startCodeTransition(async () => {
      const { success, message } = await resendChallengeAction();
      setSendButtonsText("Resend Code");
      if (!success) {
        toast.error(`Error: ${message}`);
        return;
      }
      toast.success(`Code sent! Check your email for the code`);
    });
  };

  useEffect(() => {
    if (isCodePending) {
      setSendButtonsText("Sending ...");
    }
  }, [isCodePending]);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={control}
          name="code"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
              </FormItem>
            );
          }}
        />

        <div className="flex flex-col items-center justify-between gap-2">
          <Button
            type="submit"
            className="w-full text-white"
            size="sm"
            variant="default"
            disabled={isSubmitPending}
          >
            {isSubmitPending ? (
              <div className="flex items-center gap-2">
                <Loader2 className="size-3.5 animate-spin" />
                <span>Submitting...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Submit Code</span>
              </div>
            )}
          </Button>
          <Button
            type="button"
            className="text-foreground/70 text-xs"
            size="sm"
            variant="ghost"
            disabled={isCodePending}
            onClick={sendCode}
          >
            {isCodePending ? (
              <LoaderCircle className="text-secondary group-hover:text-primary size-4 animate-spin transition-colors duration-800" />
            ) : (
              <RotateCw className="text-primary group-hover:text-primary size-4 transition-colors" />
            )}
            {sendButtonsText}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default OTPForm;
