import { ReactNode } from "react";
import HomeNavbar from "@/modules/components/home/home-navbar";
import HomeFooter from "@/modules/components/home/home-footer";

interface LayoutProps {
  children: ReactNode;
}

const HomeLayout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full min-h-screen">
      <HomeNavbar />
      <div className="flex flex-col pt-[4rem] !h-screen justify-between">
        <main className="flex- overflow-y-auto">{children}</main>
        <HomeFooter />
      </div>
    </div>
  );
};

export default HomeLayout;
