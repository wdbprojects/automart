import Link from "next/link";
import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";

const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 px-2 z-50 flex justify-between items-center border-b bg-background h-16 py-2 w-full">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 w-full justify-between">
        {/* //NOTE: MENU & LOGO */}
        <div className="flex item-center gap-2 flex-shrink-0 p-1">
          <Link
            href="/"
            className="cursor-pointer hidden sm:flex flex-row gap-0 items-center"
          >
            <h6 className="text-xl font-extrabold text-primary tracking-tight">
              Auto
            </h6>
            <h6 className="text-xl font-extrabold text-foreground tracking-tight">
              Mart
            </h6>
          </Link>
        </div>
        {/* //NOTE: SEARCH BAR*/}
        {/* <div className="flex-1 hidden md:flex justify-center max-w-[720px] mx-auto border p-1">
          <span className="text-xl text-center">SEARCH BAR GOES HERE HOME</span>
        </div> */}
        <div>
          <span className="text-xl text-center ">
            <Button size="sm" variant="default" asChild>
              <Link
                href="/inventory"
                className="!font-semibold dark:text-muted-foreground"
              >
                Search Inventory
              </Link>
            </Button>
          </span>
        </div>
        {/* //NOTE: AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
