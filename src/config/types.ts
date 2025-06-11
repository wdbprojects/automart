import { ChangeEvent } from "react";
import { Prisma } from "@prisma/client";

type Params = {
  [x: string]: string | string[];
};

export type PageProps = {
  params?: Promise<Params>;
  searchParams?: Promise<{ [x: string]: string | string[] | undefined }>;
};

export type AwaitedPageProps = {
  params?: Awaited<PageProps["params"]>;
  searchParams?: Awaited<PageProps["searchParams"]>;
};

export type ClassifiedWithImages = Prisma.ClassifiedGetPayload<{
  include: {
    images: true;
  };
}>;
export interface ClassifiedCardProps {
  classified: ClassifiedWithImages;
  favourites: number[];
}

export enum MultiStepFormEnum {
  WELCOME = 1,
  SELECT_DATA = 2,
  SUBMIT_DETAILS = 3,
}

export interface Favourites {
  ids: number[];
}

export interface TaxonomyFilterProps extends AwaitedPageProps {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export type FilterOptions<LType, VType> = Array<{ label: LType; value: VType }>;

export type MinMaxResultType = Prisma.GetClassifiedAggregateType<{
  _min: {
    year: true;
    odometerReading: true;
    price: true;
  };
  _max: {
    year: true;
    odometerReading: true;
    price: true;
  };
}>;
