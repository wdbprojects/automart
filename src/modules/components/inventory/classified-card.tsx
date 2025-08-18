"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import {
  ClassifiedCardProps,
  ClassifiedWithImages,
  MultiStepFormEnum,
} from "@/config/types";
import FavouriteButton from "./favorite-button";
import { HTMLParser } from "@/components/shared/html-parser";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  formatColor,
  formatFuelType,
  formatNumber,
  formatOdometerUnit,
  formatPrice,
  formatTransmission,
} from "@/lib/format-data";
import { ImgixImage } from "@/components/shared/imgix-image";

const ClassifiedCard = ({ classified, favourites }: ClassifiedCardProps) => {
  const [isFavourite, setIsFavourite] = useState(
    favourites.includes(classified.id),
  );
  const [isVisible, setIsVisible] = useState(true);

  const pathname = usePathname();

  useEffect(() => {
    if (!isFavourite && pathname === routes.favourites) {
      setIsVisible(false);
    }
  }, [isFavourite]);

  const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
    return [
      {
        id: "odometerReading",
        icon: <GaugeCircle className="h-4 w-4" />,
        value: `${formatNumber(
          classified?.odometerReading,
        )} ${formatOdometerUnit(classified?.odometerUnit)}`,
      },
      {
        id: "transmission",
        icon: <Cog className="h-4 w-4" />,
        value: formatTransmission(classified?.transmission),
      },
      {
        id: "fuelType",
        icon: <Fuel className="h-4 w-4" />,
        value: formatFuelType(classified?.fuelType),
      },
      {
        id: "color",
        icon: <Paintbrush2 className="h-4 w-4" />,
        value: formatColor(classified?.color),
      },
    ];
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="flex w-full flex-col justify-between gap-2 space-y-2 overflow-hidden rounded-md pt-0 pb-4">
            <CardContent className="relative px-0">
              <Link href={routes.singleClassified(classified.slug)}>
                <ImgixImage
                  placeholder="blur"
                  blurDataURL={classified.images[0]?.blurhash}
                  src={classified.images[0]?.src}
                  alt={classified.images[0]?.alt}
                  width={500}
                  height={300}
                  quality={25}
                  className="h-auto w-auto object-cover"
                />
              </Link>
              <div className="bg-secondary dark:text-background absolute top-2.5 right-3.5 rounded px-2 py-1 dark:bg-[#eff6ff]">
                <p className="text-xs font-semibold lg:text-sm">
                  {formatPrice({
                    price: classified.price,
                    currency: classified.currency,
                  })}
                </p>
              </div>
              <FavouriteButton
                isFavourite={isFavourite}
                setIsFavourite={setIsFavourite}
                id={classified.id}
              />
              <div className="flex flex-col space-y-1 px-2 pt-2">
                <Link
                  href={routes.singleClassified("slug")}
                  className="hover:text-primary line-clamp-1 text-sm leading-5 capitalize transition-colors md:text-sm lg:text-base"
                >
                  {classified.title}
                </Link>
                {classified?.description && (
                  <div className="text-muted-foreground mb-2 line-clamp-2 text-sm leading-5">
                    <HTMLParser html={classified.description} />
                    &nbsp;
                  </div>
                )}
                <ul className="grid grid-cols-2 gap-1.5">
                  {getKeyClassifiedInfo(classified)
                    .filter((val) => {
                      return val.value;
                    })
                    .map((info) => {
                      return (
                        <li
                          key={info.id}
                          className="text-muted-foreground flex items-center gap-1.5 text-xs font-normal"
                        >
                          {info.icon}
                          {info.value}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-center justify-between gap-2 px-2 sm:flex-row">
              <Button
                variant="outline"
                className="w-full cursor-pointer sm:flex-1"
                size="sm"
              >
                <Link
                  href={routes.reserve(
                    classified.slug,
                    MultiStepFormEnum.WELCOME,
                  )}
                  className="text-xs"
                >
                  Reserve
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                className="dark:text-foreground w-full cursor-pointer text-white sm:flex-1"
              >
                <Link
                  href={routes.singleClassified(classified.slug)}
                  className="text-xs font-semibold"
                >
                  View details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ClassifiedCard;
