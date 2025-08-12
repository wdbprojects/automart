import HomeLayoutMain from "@/app/(presentation)/(home)/layout";
import DarkMode from "@/components/shared/dark-mode";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { LayoutProps } from "@/config/types";
import HomeNavbar from "@/modules/components/home/home-navbar";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

const AuthLayoutComp = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">
      <div className="flex flex-row justify-between items-center">
        <Link
          href={routes.home}
          className={buttonVariants({
            size: "sm",
            variant: "outline",
            className: "absolute top-4 left-4 text-xs",
          })}
        >
          <ArrowBigLeft className="size-3" />
          <span>Home</span>
        </Link>
        <DarkMode className="absolute top-5 right-4" />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link
          href={routes.home}
          className="cursor-pointer hidden sm:flex flex-row gap-0 items-center w-full justify-center mb-0"
        >
          <h6 className="text-3xl font-semibold text-primary tracking-tight mb-0">
            Auto
          </h6>
          <h6 className="text-3xl font-semibold text-foreground tracking-tight mb-0">
            Mart
          </h6>
        </Link>
        {children}
      </div>
    </div>
  );
};

export default AuthLayoutComp;
