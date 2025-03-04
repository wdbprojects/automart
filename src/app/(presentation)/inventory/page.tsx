import ClassifiedsList from "@/components/inventory/classifieds-list";
import DarkMode from "@/components/shared/dark-mode";
import { AwaitedPageProps, Favorites, PageProps } from "@/config/types";
import { prisma } from "@/lib/prisma";
import { redis } from "@/lib/redis-store";
import { getSourceId } from "@/lib/source-ids";

const getInventory = async (searchParams: AwaitedPageProps["searchParams"]) => {
  return prisma.classified.findMany({ include: { images: true } });
};

const InventoryPage = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const classifieds = await getInventory(searchParams);
  const count = await prisma.classified.count();

  // TODO: add redis for favorites
  const sourceId = await getSourceId();
  const favorites = await redis.get<Favorites>(sourceId ?? "");

  console.log(favorites);

  return (
    <div className="px-4 py-2">
      <div className="flex justify-between items-center px-2 pb-4 pt-2">
        <h2>Inventory Count: {count}</h2>
        <DarkMode />
      </div>
      <ClassifiedsList
        classifieds={classifieds}
        favorites={favorites ? favorites.ids : []}
      />
    </div>
  );
};
export default InventoryPage;
