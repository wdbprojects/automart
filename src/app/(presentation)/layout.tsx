import { ReactNode } from "react";
import HomeLayout from "@/modules/presentation/home/home-layout";

interface PresentationLayoutProps {
  children: ReactNode;
}

const PresentationLayout = ({ children }: PresentationLayoutProps) => {
  return children;
};

export default PresentationLayout;
