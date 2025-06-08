import { Color, FuelType, OdometerUnit, Transmission } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { ChangeEvent } from "react";
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

export const syntheticEvent = (
  value: string,
  name: string,
  options: {
    label: string;
    value: string;
  }[],
  onChange: any,
) => {
  return {
    target: {
      value: value,
      name: name,
      type: "select-one",
      options: {
        length: options.length,
        item: (index: number) => options[index],
        namedItem: (name: string) => {},
      },
      addEventListener: () => {},
      dispatchEvent: (event: Event) => true,
      removeEventListener: () => {},
    },
    nativeEvent: null,
    currentTarget: null,
    bubbles: false,
    cancelable: false,
    defaultPrevented: false,
    preventDefault: () => {},
    stopPropagation: () => {},
    timeStamp: 0,
    type: "change",
    eventPhase: null,
    isTrusted: true,
    isDefaultPrevented: true,
    isPropagationStopped: false,
    persist: true,
  } as unknown as ChangeEvent<HTMLSelectElement>;
  onChange(syntheticEvent);
};
