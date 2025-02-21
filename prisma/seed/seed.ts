import { PrismaClient } from "@prisma/client";
import { seedTaxonomy } from "./taxonomy.seed";
import { seedClassifieds } from "./classified.seeds";
import { seedImages } from "./images.seeds";

const prisma = new PrismaClient();

async function main() {
  // await prisma.$executeRaw`TRUNCATE TABLE "makes" RESTART IDENTITY CASCADE`;
  // await seedTaxonomy(prisma);
  // await seedClassifieds(prisma);
  await seedImages(prisma);
}
main()
  .catch((err) => {
    throw err;
  })
  .finally(async () => {
    return await prisma.$disconnect();
  });
