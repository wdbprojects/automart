import { AwaitedPageProps, Favourites, PageProps } from "@/config/types";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-id";
import InventoryMain from "@/modules/presentation/ui/inventory-main";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({
    include: {
      images: true,
    },
  });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId ?? "");

  console.log({ favourites });

  return (
    <InventoryMain
      count={count}
      classifieds={classifieds}
      favourites={favourites ? favourites.ids : []}
    />
  );
};

export default InventoryPage;
