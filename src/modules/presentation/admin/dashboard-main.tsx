import AdminNavbar from "@/modules/components/admin/admin-navbar";
import DashboardSidebar from "@/modules/components/admin/dashboard-sidebar";
import InventoryFooter from "@/modules/components/inventory/inventory-footer";

const DashboardMain = () => {
  return (
    <div className="h-full w-full">
      <AdminNavbar />
      <div className="flex overflow-y-auto">
        <DashboardSidebar />
        <div className="flex w-full flex-col justify-between pt-[4rem] !pb-[0rem]">
          <div className="flex-1">CONTENT</div>
          <div>
            <InventoryFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
