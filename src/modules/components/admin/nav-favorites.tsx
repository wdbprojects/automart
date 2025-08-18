import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { FavoriteLink } from "@/config/types";
import { Item } from "@radix-ui/react-select";
import Link from "next/link";

const NavFavorites = ({ favorites }: { favorites: FavoriteLink[] }) => {
  return (
    <SidebarMenu>
      {favorites.map((item) => {
        const { id, name, url, emoji } = item;
        return (
          <SidebarMenuItem key={id}>
            <SidebarMenuButton asChild>
              <Link href={url}>
                <span>{emoji}</span>
                <span>{name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};

export default NavFavorites;
