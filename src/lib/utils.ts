import { Color, FuelType, OdometerUnit, Transmission } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatNumber = (
  num: number | null,
  options?: Intl.NumberFormatOptions,
) => {
  if (!num) return "0";
  return new Intl.NumberFormat("en-US", options).format(num);
};

export const formatOdometerUnit = (unit: OdometerUnit) => {
  return unit === "MILES" ? "mi" : "km";
};

export const formatTransmission = (transmission: Transmission) => {
  return transmission === "MANUAL" ? "Manual" : "Automatic";
};

export const FormatFuelType = (fuelType: FuelType) => {
  switch (fuelType) {
    case "ELECTRIC":
      return "Electric";
    case "DIESEL":
      return "Diesel";
    case "PETROL":
      return "Petrol";
    case "HYBRID":
      return "Hybrid";
    default:
      return "Unknown";
  }
};

export const formatColor = (color: Color) => {
  let colorArr = color.toLowerCase().split("");
  const result = colorArr.toSpliced(0, 1, colorArr[0].toUpperCase());
  return result.join("");
};
