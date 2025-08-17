import { PrismaClient } from "@prisma/client";
import { seedTaxonomy } from "./taxonomy.seed";
import { seedClassifieds } from "./classified.seed";
import { seedImages } from "./images.seed";
import { seedAdmin } from "./admin.seed";

const prisma = new PrismaClient();

const main = async () => {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await seedTaxonomy(prisma);
  // await seedClassifieds(prisma);
  // await seedImages(prisma);
  await seedAdmin(prisma);
};

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

export default main;
