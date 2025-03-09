"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { AwaitedPageProps } from "@/config/types";
import { endpoints } from "@/config/endpoints";
import { api } from "@/lib/api-client";
import Select from "@/components/ui/select";

interface TaxonomyFiltersProps extends AwaitedPageProps {
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

type FilterOptions<LType, VType> = Array<{
  label: LType;
  value: VType;
}>;

const TaxonomyFilters = (props: TaxonomyFiltersProps) => {
  const { searchParams, handleChange } = props;
  const [makes, setMakes] = useState<FilterOptions<string, string>>([]);
  const [models, setModels] = useState<FilterOptions<string, string>>([]);
  const [modelVariants, setModelVariants] = useState<
    FilterOptions<string, string>
  >([]);

  useEffect(() => {
    (async function fetchMakesOptions() {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(
        searchParams as Record<string, string>,
      )) {
        if (value) {
          params.set(key, value as string);
        }
      }
      const url = new URL(endpoints.taxonomy, window.location.href);
      url.search = params.toString();
      const data = await api.get<{
        makes: FilterOptions<string, string>;
        models: FilterOptions<string, string>;
        modelVariants: FilterOptions<string, string>;
      }>(url.toString());
      setMakes(data.makes);
      setModels(data.models);
      setModelVariants(data.modelVariants);
    })();
  }, [searchParams]);

  return (
    <div className="space-y-6">
      {/* //NOTE: Make select */}
      <Select
        label="Make"
        name="make"
        value={searchParams?.make as string}
        options={makes}
        onChange={handleChange}
      />
      {/* //NOTE: Model select */}
      <Select
        label="Model"
        name="model"
        value={searchParams?.model as string}
        options={models}
        onChange={handleChange}
        disabled={!models.length}
      />
      {/* //NOTE: Model variant select */}
      <Select
        label="Model Variant"
        name="modelVariant"
        value={searchParams?.modelVariant as string}
        options={modelVariants}
        onChange={handleChange}
        disabled={!modelVariants.length}
      />
    </div>
  );
};
export default TaxonomyFilters;
