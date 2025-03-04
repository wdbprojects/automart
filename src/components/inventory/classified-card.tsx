"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Image from "next/image";
import { Color, FuelType, OdoUnit, Transmission } from "@prisma/client";
import { ClassifiedWithImages, MultiStepFormEnum } from "@/config/types";
import HtmlParser from "@/components/shared/html-parser";
import { Cog, Fuel, GaugeCircle, Paintbrush2 } from "lucide-react";

interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
}

function formatNumber(num: number | null, options?: Intl.NumberFormatOptions) {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", options).format(num);
}

function formatOdometerUnit(unit: OdoUnit) {
  return unit === OdoUnit.MILES ? "Mi" : "Km";
}

function formatTransmission(transmission: Transmission) {
  return transmission === Transmission.AUTOMATIC ? "Auto" : "Manual";
}

function formatFuelType(fuelType: FuelType) {
  return fuelType === FuelType.DIESEL
    ? "Diesel"
    : FuelType.PETROL
    ? "Petrol"
    : FuelType.ELECTRIC
    ? "Electric"
    : FuelType.HYBRID
    ? "Hybrid"
    : "Unknown";
}

function formatColor(color: Color) {
  if (!color) return "Unknown";
  let formattedColor = color
    .toLowerCase()
    .split("")
    .toSpliced(0, 1, color[0].toUpperCase())
    .join("");
  return formattedColor;
}

const getKeyClassifiedInfo = (classified: ClassifiedWithImages) => {
  return [
    {
      id: "odoReading",
      icon: <GaugeCircle className="h-4 w-4" />,
      value: `${formatNumber(classified.odoReading)} ${formatOdometerUnit(
        classified.odoUnit,
      )}`,
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

const ClassifiedCard = (props: ClassifiedCardProps) => {
  const { classified } = props;

  return (
    <Card className="relative w-full pt-0 pb-4 gap-2 rounded-md overflow-hidden flex flex-col justify-between space-y-2">
      <CardContent className="px-0">
        <Link href={routes.singleClassified(classified.slug)}>
          <Image
            src={classified.images[0]?.src}
            alt={classified.images[0]?.alt}
            placeholder="blur"
            blurDataURL={classified.images[0]?.blurhash}
            className="object-cover w-auto h-auto"
            width={400}
            height={300}
            quality={25}
          />
        </Link>
        <div className="absolute top-2.5 right-3.5 bg-secondary text-foreground font-bold px-2 py-1 rounded">
          <p className="text-xs lg-text-base xl-text-lg font-semibold">
            {classified.price}
          </p>
        </div>
        <div className="flex flex-col space-y-1 px-2 pt-2">
          <Link
            href={routes.singleClassified(classified.slug)}
            className="text-sm md:text-sm lg:text-base leading-5 line-clamp-1 capitalize transition-colors hover:text-primary"
          >
            {classified.title}
          </Link>
          {classified.description && (
            <p className="text-sm leading-5 text-muted-foreground line-clamp-2 mb-2">
              <HtmlParser html={classified.description} />
              &nbsp;
            </p>
          )}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-0.5">
            {getKeyClassifiedInfo(classified)
              ?.filter((val) => {
                return val.value;
              })
              .map((item) => {
                const { id, icon, value } = item;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-1.5 mb-1.5 font-normal text-xs text-muted-foreground"
                  >
                    {icon} {value}
                  </li>
                );
              })}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="px-2 flex flex-col sm:flex-row justify-between items-center gap-2">
        <Button
          variant="outline"
          className="cursor-pointer sm:flex-1 w-full"
          size="sm"
          asChild
        >
          <Link
            href={routes.reserve(classified.slug, MultiStepFormEnum.WELCOME)}
          >
            Reserve
          </Link>
        </Button>
        <Button className="cursor-pointer sm:flex-1 w-full" asChild size="sm">
          <Link href={routes.singleClassified(classified.slug)}>
            View details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ClassifiedCard;
