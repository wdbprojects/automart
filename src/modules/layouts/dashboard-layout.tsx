import { SidebarProvider } from "@/components/ui/sidebar";
import { LayoutProps } from "@/config/types";

const DashboardLayoutModule = ({ children }: LayoutProps) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default DashboardLayoutModule;
