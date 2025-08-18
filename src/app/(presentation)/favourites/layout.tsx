import FavouritesLayoutModule from "@/modules/layouts/favorites-layout";
import { LayoutProps } from "@/config/types";

const FavouritesLayout = ({ children }: LayoutProps) => {
  return <FavouritesLayoutModule>{children}</FavouritesLayoutModule>;
};

export default FavouritesLayout;
