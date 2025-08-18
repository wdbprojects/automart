import { Button } from "@/components/ui/button";
import { imageSources } from "@/config/constants";
import { routes } from "@/config/routes";
import { AwaitedPageProps } from "@/config/types";
import { imgixLoader } from "@/lib/imgix-loader";
import prisma from "@/lib/prisma";
import { buildClassifiedFilterQuery } from "@/lib/utils";
import HomeTaxonomyFilters from "@/modules/components/home/home-taxonomy-filters";
import SearchButton from "@/modules/components/home/search-button";
import { ClassifiedStatus } from "@prisma/client";
import Link from "next/link";

const HeroSection = async ({ searchParams }: AwaitedPageProps) => {
  const totalFiltersApplied = Object.keys(searchParams || {}).length;
  const isFilterApplied = totalFiltersApplied > 0;
  const classifiedCount = await prisma.classified.count({
    where: buildClassifiedFilterQuery(searchParams),
  });

  const minMaxValues = await prisma.classified.aggregate({
    where: { status: ClassifiedStatus.LIVE },
    _min: { year: true, price: true, odometerReading: true },
    _max: { year: true, price: true, odometerReading: true },
  });

  return (
    <section
      className="relative flex h-[calc(100vh-4rem)] items-center justify-center bg-cover bg-center bg-no-repeat px-2 pt-24 pb-[6rem]"
      style={{
        backgroundImage: `url(${imgixLoader({
          src: imageSources.carLineup,
          width: 1280,
          quality: 100,
        })})`,
      }}
    >
      <div className="absolute inset-0 bg-[#020817] opacity-75"></div>
      <div className="relative z-10 container grid-cols-2 items-center space-y-4 sm:space-y-12 lg:grid">
        <div className="px-10 lg:px-0">
          <h1 className="text-center text-xl leading-2 font-extrabold text-white uppercase sm:text-2xl sm:leading-snug md:text-3xl lg:text-5xl">
            Unbeatable deals on new <br /> and used cars
          </h1>
          <h2 className="mt-4 text-center text-base text-white uppercase md:text-xl lg:text-2xl">
            Discover your dream car today
          </h2>
        </div>
        <div className="bg-background mx-auto w-full max-w-md rounded-xl p-6 shadow-lg">
          <div className="space-y-4 pb-4">
            <div className="flex w-full flex-col space-y-2 gap-x-4">
              <HomeTaxonomyFilters
                searchParams={searchParams}
                minMaxValues={minMaxValues}
              />
            </div>
            <SearchButton count={classifiedCount} />
            {isFilterApplied && (
              <Button asChild variant="secondary" className="w-full">
                <Link href={routes.home}>
                  Clear filters ({totalFiltersApplied})
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
