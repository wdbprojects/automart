import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";

const HomeSidebar = () => {
  return (
    <Sidebar className="pt-18 z-40 rounded border-none" variant="floating">
      <SidebarContent className="py-0 pb-16">
        {/* <SidebarSeparator className="!my-0 !py-0 h-auto" /> */}
      </SidebarContent>
      <SidebarFooter className="bg-background rounded-b-lg p-4">
        <div className="flex justify-center w-full rounded-sm">
          <span className="text-xl">NEWSLETTER FORM</span>
        </div>
        <div className="px-0 py-2 bg-secondary text-sm text-center">
          AutoMart &copy; 2025
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default HomeSidebar;
