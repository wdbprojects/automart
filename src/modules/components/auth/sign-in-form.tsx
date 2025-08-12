"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInAction } from "@/app/_actions/sign-in";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SignInSchema } from "@/app/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaGoogle } from "react-icons/fa";
import FormButtons from "@/modules/components/auth/form-buttons";
import { routes } from "@/config/routes";

const SignInForm = () => {
  const [state, formAction] = useActionState(signInAction, {
    success: false,
    message: "",
  });

  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const { control, reset } = form;

  useEffect(() => {
    if (state.success && formRef.current) {
      router.refresh();
      router.push(routes.challenge);
    }
  }, []);

  return (
    <div>
      <Card className="mt-0 pt-4">
        <CardHeader className="pt-0">
          <CardTitle className="text-foreground text-center text-xl font-semibold">
            Admin Login
          </CardTitle>
          <CardDescription className="text-center">
            Login with your email and password
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Form {...form}>
            <form ref={formRef} action={formAction} className="space-y-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="mb-1">Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          autoComplete="off"
                        />
                      </FormControl>
                      <FormMessage className="text-destructive text-xs italic" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel className="mb-1">Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Enter your password"
                          autoComplete="off"
                        />
                      </FormControl>
                      <div className="relative m-0 p-0">
                        <FormMessage className="text-destructive mt-0.5 text-xs italic" />
                        <Link
                          href={"/auth/reset"}
                          className="text-primary absolute top-0 right-0 text-xs outline-none hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                    </FormItem>
                  );
                }}
              />
              <div className="mt-8 flex items-center justify-between gap-3">
                <FormButtons reset={reset} />
              </div>
            </form>
          </Form>

          <div className="after:border-border relative mt-3 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-card text-muted-foreground relative z-10 px-2">
              Or continue with Google
            </span>
          </div>
          <div className="w-full">
            <Button
              size="sm"
              variant="outline"
              disabled={false}
              className="flex w-full items-center justify-center gap-3 text-white"
            >
              <FaGoogle />
              <span>Sign in with Google</span>
            </Button>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground mt-4 w-full px-8 text-center text-xs">
        By clicking continue, you agree to{" "}
        <span className="hover:text-primary cursor-pointer underline-offset-4 hover:underline">
          <Link href="#">Terms of service</Link>
        </span>{" "}
        and{" "}
        <span className="hover:text-primary cursor-pointer underline-offset-4 transition-all hover:underline">
          <Link href="#">Privacy Policy</Link>.
        </span>
      </div>
    </div>
  );
};

export default SignInForm;
