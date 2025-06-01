import { ReactNode } from "react";
import HomeLayout from "@/modules/layouts/home-layout";

interface PresentationLayoutProps {
  children: ReactNode;
}

const PresentationLayout = ({ children }: PresentationLayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default PresentationLayout;
