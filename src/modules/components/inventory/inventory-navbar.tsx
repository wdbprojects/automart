import DarkMode from "@/components/shared/dark-mode";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";
import SearchInputNav from "./search-input-nav";
import SearchInput from "../inventory-sidebar/search-input";

const InventoryNavbar = () => {
  return (
    <nav className="fixed top-0 right-0 px-2 z-50 flex justify-between items-center border-b bg-background h-16 py-2 w-full">
      <div className="flex items-center gap-1 sm:gap-2 md:gap-4 w-full justify-between">
        {/* //NOTE: MENU & LOGO */}
        <div className="flex item-center gap-2 flex-shrink-0 p-1">
          <SidebarTrigger />
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
        <div className="flex-1 hidden md:flex justify-center max-w-[720px] mx-auto p-1">
          {/* <SearchInputNav /> */}
          <SearchInput
            className="w-full pr-12 shadow-none rounded-full max-w-[600px] mx-auto pl-8"
            placeholder="Search for classifieds..."
          />
        </div>
        {/* //NOTE: AUTH */}
        <div className="flex flex-shrink-0 items-center gap-3 p-1">
          <DarkMode />
        </div>
      </div>
    </nav>
  );
};

export default InventoryNavbar;
