import { LayoutProps } from "@/config/types";
import DashboardLayoutModule from "@/modules/layouts/dashboard-layout";

const DashboarLayout = ({ children }: LayoutProps) => {
  return <DashboardLayoutModule>{children}</DashboardLayoutModule>;
};

export default DashboarLayout;
