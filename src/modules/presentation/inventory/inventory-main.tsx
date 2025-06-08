import ClassifiedCard from "../../components/inventory/classified-card";
import ClassifiedList from "../../components/inventory/classified-list";
import CustomPagination from "../../../components/shared/custom-pagination";
import { routes } from "@/config/routes";
import { Separator } from "@/components/ui/separator";
import SidebarFilters from "@/modules/components/inventory-sidebar/sidebar-main";
import InventoryNavbar from "@/modules/components/inventory/inventory-navbar";
import { PageProps } from "@/config/types";

const InventoryMain = ({
  count,
  classifieds,
  favourites,
  totalPages,
  searchParams,
}: {
  count: number;
  classifieds: any;
  favourites: number[];
  totalPages: number;
  searchParams: { [x: string]: string | string[] | undefined };
}) => {
  return (
    <div className="w-full mt-[4rem]">
      <InventoryNavbar />
      <div className="flex min-h-screen">
        <SidebarFilters minMaxValues={null} searchParams={searchParams ?? {}} />
        <div className="mt-0">
          <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 py-1 h-10 mb-10 md:mb-0">
            <h2 className="text-sm font-semibold text-foreground flex-1">
              Items found: {count}
            </h2>
            <CustomPagination
              baseURL={routes.inventory}
              totalPages={totalPages}
              maxVisiblePages={5}
              styles={{
                paginationRoot: "justify-end",
                paginationPrevious: "",
                paginationNext: "",
                paginationLink: "border-none active:border",
                paginationLinkActive:
                  "bg-secondary text-foreground shadow-none ",
              }}
            />
          </div>
          <div className="">
            <ClassifiedList classifieds={classifieds} favourites={favourites} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMain;
