import { CLASSIFIEDS_PER_PAGE } from "@/config/constants";
import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import InventoryMain from "@/modules/presentation/ui/inventory-main";
import { PageSchema } from "@/app/schemas/page.schema";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  // validate page
  const validPage = PageSchema.parse(searchParams?.page);
  // get current page
  const currentPage = validPage ? validPage : 1;
  // calculate the offset
  const offset = (currentPage - 1) * CLASSIFIEDS_PER_PAGE;

  return prisma.classified.findMany({
    include: { images: { take: 1 } },
    skip: offset,
    take: CLASSIFIEDS_PER_PAGE,
  });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();
  const totalPages = Math.ceil(count / CLASSIFIEDS_PER_PAGE);

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  return (
    <InventoryMain
      count={count}
      classifieds={classifieds}
      favourites={favourites ? favourites.ids : []}
      totalPages={totalPages}
    />
  );
};

export default InventoryPage;
