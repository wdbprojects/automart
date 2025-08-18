import {
  Sidebar,
  SidebarContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { favoritesLinks } from "@/lib/data-links";
import NavFavorites from "./nav-favorites";

const DashboardSidebar = () => {
  return (
    <Sidebar
      className="z-40 mt-1 pt-[4rem]"
      variant="floating"
      collapsible="offcanvas"
    >
      <SidebarHeader>
        <h2 className="text-primary text-2xl font-semibold">Admin Dashboard</h2>
      </SidebarHeader>

      <SidebarContent className="m-1 py-0 pb-16">
        <SidebarGroupLabel>Favorites</SidebarGroupLabel>
        <NavFavorites favorites={favoritesLinks} />
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
