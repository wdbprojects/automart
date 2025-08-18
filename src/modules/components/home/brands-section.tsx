import { routes } from "@/config/routes";
import prisma from "@/lib/prisma";
import { ClassifiedStatus } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

const BrandsSection = async () => {
  const brands = await prisma.make.findMany({
    where: {
      name: {
        in: [
          "Rolls-Royce",
          "Land Rover",
          "Aston Martin",
          "BMW",
          "Ford",
          "Audi",
          "Jaguar",
          "Porsche",
          "Mercedes-Benz",
          "Lamborghini",
          "Ferrari",
          "Bentley",
          "Volkswagen",
          "Lexus",
        ],
        mode: "insensitive",
      },
    },
  });

  const count = await prisma.classified.count({
    where: { status: ClassifiedStatus.LIVE },
  });

  return (
    <div className="dark:bg-popover bg-gray-200 pt-8 !pb-16">
      <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
        <div className="px-6 sm:text-center lg:px-8">
          <h2 className="text-foreground mt-2 text-center text-4xl font-semibold tracking-tight">
            Our Brands
          </h2>
          <p className="text-muted-foreground mt-2 text-lg leading-8">
            We have {count} vehicles in stock ready for same-day drive away
          </p>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-4 text-center md:grid-cols-4 lg:grid-cols-5">
          {brands.map(({ id, image, name }) => {
            return (
              <Link
                href={`${routes.inventory}?make=${id}`}
                key={id}
                className="animate-in relative flex h-24 justify-center transition-all duration-100 hover:scale-110"
              >
                <Image
                  src={image}
                  alt={name}
                  className="aspect-1/1 object-contain"
                  width={100}
                  height={100}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BrandsSection;
