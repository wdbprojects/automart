import InventoryLayout from "@/modules/presentation/inventory/inventory-layout";
import { ReactNode } from "react";

interface PresentationLayoutProps {
  children: ReactNode;
}

const InventaryLayout = ({ children }: PresentationLayoutProps) => {
  return <InventoryLayout>{children}</InventoryLayout>;
};

export default InventaryLayout;
