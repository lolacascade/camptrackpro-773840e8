
import { useState } from "react";
import { Asset } from "@/types/asset";
import { AssetFilters } from "@/types/asset";

const defaultAssetFilters: AssetFilters = {
  searchTerm: "",
  page: 1
};

export function useAssetFilters() {
  const [filters, setFilters] = useState<AssetFilters>(defaultAssetFilters);

  const filterAssets = (assets: Asset[]) => {
    return assets.filter(asset => {
      const searchMatch = filters.searchTerm
        ? `${asset.make} ${asset.model} ${asset.year}`
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
        : true;

      return searchMatch;
    });
  };

  return {
    filters,
    setFilters,
    filterAssets
  };
}
