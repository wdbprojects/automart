import LatestArrivalCarousel from "./latest-arrival-carrousel";
import { ClassifiedStatus } from "@prisma/client";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Favourites } from "@/config/types";
import prisma from "@/lib/prisma";

const LatestArrivalSection = async () => {
  const classifieds = await prisma.classified.findMany({
    where: { status: ClassifiedStatus.LIVE },
    take: 6,
    include: { images: true },
  });

  const sourceId = await getSourceId();
  const favourites = await redis.get<Favourites>(sourceId || "");

  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto max-w-[80vw]">
        <h2 className="text-foreground text-center text-2xl font-semibold tracking-tight uppercase sm:text-4xl">
          Latest Arrivals
        </h2>
        <LatestArrivalCarousel
          classifieds={classifieds}
          favourites={favourites ? favourites.ids : []}
        />
      </div>
    </section>
  );
};

export default LatestArrivalSection;
