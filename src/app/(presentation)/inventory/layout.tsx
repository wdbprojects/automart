import InventoryLayout from "@/modules/layouts/inventory-layout";
import { ReactNode } from "react";

interface PresentationLayoutProps {
  children: ReactNode;
}

const InventaryLayout = ({ children }: PresentationLayoutProps) => {
  return <InventoryLayout>{children}</InventoryLayout>;
};

export default InventaryLayout;
