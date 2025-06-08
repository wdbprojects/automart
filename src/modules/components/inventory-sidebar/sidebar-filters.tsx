"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import SearchInput from "./search-input";
import TaxonomyFilters from "./taxonomy-filters";
import { TaxonomyFilterProps } from "@/config/types";

const SidebarFilters = (props: TaxonomyFilterProps) => {
  const { searchParams, handleChange } = props;

  return (
    <SidebarGroup className="py-0">
      <SidebarGroupLabel className="font-semibold">
        Search by keyword
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 block">
          <SearchInput
            placeholder="Search classifieds"
            className="pl-8 rounded-full "
          />
        </div>
      </SidebarGroupContent>
      <hr className="mx-2 mt-4 mb-1" />
      <SidebarGroupLabel className="font-semibold">
        Search by taxonomy
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="px-2 bock">
          <TaxonomyFilters
            handleChange={handleChange}
            searchParams={searchParams}
          />
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default SidebarFilters;
