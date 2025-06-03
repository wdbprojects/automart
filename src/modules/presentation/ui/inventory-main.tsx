import ClassifiedCard from "./components/inventory/classified-card";
import ClassifiedList from "./components/inventory/classified-list";
import CustomPagination from "../../../components/shared/custom-pagination";
import { routes } from "@/config/routes";

const InventoryMain = ({
  count,
  classifieds,
  favourites,
  totalPages,
}: {
  count: number;
  classifieds: any;
  favourites: number[];
  totalPages: number;
}) => {
  return (
    <div className="mt-0">
      <div className="flex flex-col md:flex-row items-center justify-start gap-2 md:justify-between px-4 py-1 h-10 mb-10 md:mb-2">
        <h2 className="text-sm font-semibold text-foreground flex-1 border">
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
            paginationLinkActive: "bg-secondary text-foreground shadow-none ",
          }}
        />
      </div>
      <div className="">
        <ClassifiedList classifieds={classifieds} favourites={favourites} />
      </div>
    </div>
  );
};

export default InventoryMain;
