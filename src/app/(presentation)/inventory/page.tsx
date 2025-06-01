import { AwaitedPageProps, PageProps } from "@/config/types";
import prisma from "@/lib/prisma";
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

  return <InventoryMain count={count} classifieds={classifieds} />;
};

export default InventoryPage;
