import ClassifiedList from "../../components/inventory/classified-list";
import CustomPagination from "../../../components/shared/custom-pagination";
import { routes } from "@/config/routes";
import SidebarFilters from "@/modules/components/inventory-sidebar/sidebar-main";
import InventoryNavbar from "@/modules/components/inventory/inventory-navbar";
import { ClassifiedWithImages, MinMaxResultType } from "@/config/types";
import InventoryFooter from "@/modules/components/inventory/inventory-footer";

const InventoryMain = ({
  count,
  classifieds,
  favourites,
  totalPages,
  searchParams,
  minMaxResult,
}: {
  count: number;
  classifieds: Promise<ClassifiedWithImages[]>;
  favourites: number[];
  totalPages: number;
  searchParams: { [x: string]: string | string[] | undefined };
  minMaxResult: MinMaxResultType;
}) => {
  return (
    <div className="h-full w-full">
      <InventoryNavbar />
      <div className="flex overflow-y-auto">
        <SidebarFilters
          minMaxResult={minMaxResult}
          searchParams={searchParams ?? {}}
        />
        <div className="flex w-full flex-col justify-between pt-[4rem] pb-[0rem]">
          <div className="flex-1">
            <div className="mb-10 flex flex-col items-center justify-start gap-2 px-4 py-1 md:mb-0 md:flex-row md:justify-between">
              <h2 className="text-foreground min-w-[250px] flex-1 text-sm font-semibold">
                Items found: {count}
              </h2>
              <CustomPagination
                baseURL={routes.inventory}
                totalPages={totalPages}
                maxVisiblePages={10}
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
              <ClassifiedList
                classifieds={classifieds}
                favourites={favourites}
              />
            </div>
          </div>
          <div>
            <InventoryFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryMain;
