"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <NextTopLoader showSpinner={false} />
      {children}
      <Toaster richColors closeButton position="bottom-right" />
    </ThemeProvider>
  );
};

export default Providers;
