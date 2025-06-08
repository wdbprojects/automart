import { ReactNode } from "react";
import HomeNavbar from "@/modules/components/home/home-navbar";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full">
      <HomeNavbar />
      <div className="flex flex-col min-h-screen pt-[4rem]">
        <h3 className="text-2xl text-pink-500">Testing HOME layout</h3>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default HomeLayout;
