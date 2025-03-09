"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AwaitedPageProps } from "@/config/types";
import { parseAsString, useQueryStates } from "nuqs";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { env } from "@/env";
import { cn } from "@/lib/utils";
import SearchInput from "@/components/shared/search-input";
import TaxonomyFilters from "@/components/inventory/taxonomy-filters";

interface SidebarProps extends AwaitedPageProps {
  minMaxValues: any;
}

const Sidebar = ({ minMaxValues, searchParams }: SidebarProps) => {
  const router = useRouter();
  const [filterCount, setFilterCount] = useState(0);
  const [queryStates, setQueryStates] = useQueryStates(
    {
      make: parseAsString.withDefault(""),
      model: parseAsString.withDefault(""),
      modelVariant: parseAsString.withDefault(""),
      minYear: parseAsString.withDefault(""),
      maxYear: parseAsString.withDefault(""),
      minPrice: parseAsString.withDefault(""),
      maxPrice: parseAsString.withDefault(""),
      minReading: parseAsString.withDefault(""),
      maxReading: parseAsString.withDefault(""),
      currency: parseAsString.withDefault(""),
      odoUnit: parseAsString.withDefault(""),
      transmission: parseAsString.withDefault(""),
      fuelType: parseAsString.withDefault(""),
      bodyType: parseAsString.withDefault(""),
      color: parseAsString.withDefault(""),
      doors: parseAsString.withDefault(""),
      seats: parseAsString.withDefault(""),
    },
    {
      shallow: false,
    },
  );

  const clearFilters = () => {
    const url = new URL(routes.inventory, env.NEXT_PUBLIC_APP_URL);
    window.location.replace(url.toString());
    setFilterCount(0);
  };

  useEffect(() => {
    const filterCount = Object.entries(
      searchParams as Record<string, string>,
    ).filter(([key, value]) => {
      return key !== "page" && value;
    }).length;
    setFilterCount(filterCount);
  }, [searchParams]);

  const handleChange = async (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setQueryStates({ [name]: value || null });
    if (name === "make") {
      setQueryStates({
        model: null,
        modelVariant: null,
      });
    }
    router.refresh();
  };

  return (
    <div className="py-4 w-[21.25rem] bg-background border-r border-muted-background block">
      <div>
        <div className="text-lg font-semibold flex justify-between px-4">
          <span>Filters</span>
          <Button
            size="sm"
            variant="link"
            type="button"
            onClick={clearFilters}
            aria-disabled={!filterCount}
            className={cn(
              "text-sm cursor-pointer hover:no-underline text-foreground font-semibold",
              !filterCount
                ? "disabled opacity-50 pointer-events-none cursor-default"
                : "hover:underline",
            )}
          >
            Clear all {filterCount ? `(${filterCount})` : null}
          </Button>
        </div>
      </div>

      <div className="p-4">
        <SearchInput
          placeholder="Search classifieds..."
          className="w-full px-3 py-2 border border rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 !text-sm"
        />
      </div>

      <div className="p-4 space-y-2">
        <TaxonomyFilters
          searchParams={searchParams}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};
export default Sidebar;
