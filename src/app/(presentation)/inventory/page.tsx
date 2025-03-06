import ClassifiedsList from "@/components/inventory/classifieds-list";
import Sidebar from "@/components/inventory/sidebar";
import CustomPagination from "@/components/shared/custom-pagination";
import DarkMode from "@/components/shared/dark-mode";

import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { routes } from "@/config/routes";
import { AwaitedPageProps, Favorites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-ids";
import { z } from "zod";

const PageSchema = z
  .string()
  .transform((val) => {
    return Math.max(Number(val), 1);
  })
  .optional();

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  const validPage = PageSchema.parse(searchParams?.page);

  // NOTE: get the current page
  const page = validPage ? validPage : 1;
  // NOTE: calculate the offset
  const offset = (page - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    where: {},
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count({ where: {} });

  // HACK: add redis for favorites
  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? "");
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  return (
    <div className="flex">
      <Sidebar minMaxValues={null} searchParams={searchParams} />
      <div className="flex-1 p-4 bb-background">
        <div className="flex space-y-2 flex-col  items-center justify-center pb-4 -mt-1">
          <div className="flex justify-between items-center w-full mb-3">
            <h2 className="text-lg font-semibold min-w-fit">
              We have found {count} classifieds
            </h2>
            {/* //NOTE: add dialog filters for mobile */}
            <DarkMode />
          </div>
          <CustomPagination
            baseURL={routes.inventory}
            totalPages={totalPages}
            styles={{
              paginationRoot: "hidden xl:flex justify-end",
              paginationPrevious: "",
              paginationNext: "",
              paginationLink:
                "border-none active:border text-foreground text-muted-foreground",
              paginationLinkActive: "bg-secondary text-foreground shadow-none",
            }}
          />
          <ClassifiedsList
            classifieds={classifieds}
            favorites={favorites ? favorites.ids : []}
          />
        </div>
      </div>
    </div>
  );
};
export default InventoryPage;
