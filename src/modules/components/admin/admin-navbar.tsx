import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, MenuIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/lib/data-links";
import { Favourites } from "@/config/types";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import { auth } from "@/auth";
import { routes } from "@/config/routes";
import SignOutForm from "@/modules/components/auth/sign-out-form";

const AdminNavbar = async () => {
  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");
  const session = await auth();

  return (
    <nav className="bg-background fixed top-0 right-0 z-50 flex h-16 w-full items-center justify-between border-b px-2 py-2">
      <div className="flex w-full items-center justify-between gap-1 sm:gap-2 md:gap-4">
        {/* //NOTE: MENU & LOGO */}
        <div className="item-center flex flex-shrink-0 gap-2 p-1">
          <SidebarTrigger />
          <Link
            href="/"
            className="hidden cursor-pointer flex-row items-center gap-0 sm:flex"
          >
            <h6 className="text-primary text-xl font-extrabold tracking-tight">
              Auto
            </h6>
            <h6 className="text-foreground text-xl font-extrabold tracking-tight">
              Mart
            </h6>
          </Link>
        </div>

        {/* //NOTE: AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />
          {session ? (
            <div className="">
              <SignOutForm />
            </div>
          ) : (
            <Button size="sm" className="cursor-pointer text-white" asChild>
              <Link href={routes.signIn}>Sign In</Link>
            </Button>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className="cursor-pointer"
                  variant="outline"
                  asChild
                >
                  <Link href="/favourites" className="relative">
                    <Heart />
                    {favourites?.ids.length && favourites?.ids.length > 0 ? (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center"
                      >
                        {favourites?.ids.length}
                      </Badge>
                    ) : null}
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="dark:text-foreground text-white">Favourites</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Sheet>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <SheetTrigger asChild className="cursor-pointer">
                    <Button variant="outline" size="icon" className="!p-0">
                      <MenuIcon className="!h-6 !w-6" strokeWidth={1.3} />
                    </Button>
                  </SheetTrigger>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
            <SheetContent side="right" className="w-full max-w-xs p-4">
              <SheetHeader>
                <SheetTitle>Main Menu</SheetTitle>
                <nav className="grid gap-2">
                  {navLinks.map((link) => {
                    const { id, name, href } = link;
                    return (
                      <Link
                        key={id}
                        href={href}
                        className="text-foreground/80 hover:text-foreground bg-secondary/70 hover:bg-secondary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
                      >
                        {name}
                      </Link>
                    );
                  })}
                </nav>
                <SheetFooter>
                  <SheetClose asChild>
                    <SheetDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </SheetDescription>
                  </SheetClose>
                </SheetFooter>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
