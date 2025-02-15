
import { Asset } from "@/types/asset";
import { AssetTable } from "./table/AssetTable";
import { useAssetFilters } from "../hooks/useAssetFilters";
import { useAssetsContext } from "../context/AssetsProvider";

interface AssetsContentProps {
  onEdit: (asset: Asset) => void;
  onViewDetails: (asset: Asset) => void;
}

export function AssetsContent({ onEdit, onViewDetails }: AssetsContentProps) {
  const { assets, isLoading } = useAssetsContext();
  const {
    filters,
    setFilters,
    customerOptions,
    filteredAssets
  } = useAssetFilters(assets);

  return (
    <AssetTable
      assets={filteredAssets}
      onEdit={onEdit}
      onViewDetails={onViewDetails}
      isLoading={isLoading}
      filters={filters}
      onFiltersChange={setFilters}
      customerOptions={customerOptions}
    />
  );
}
