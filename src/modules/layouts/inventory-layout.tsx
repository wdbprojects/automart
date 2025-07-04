import { ReactNode } from "react";
import HomeNavbar from "@/modules/components/home/home-navbar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface LayoutProps {
  children: ReactNode;
}

const InventoryLayout = ({ children }: LayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default InventoryLayout;
