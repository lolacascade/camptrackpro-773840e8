
import { useState, useMemo } from 'react';
import { Asset, AssetFilterState } from '@/types/asset';

export function useAssetFilters(assets: Asset[]) {
  const [filters, setFilters] = useState<AssetFilterState>({
    searchTerm: '',
    typeFilter: 'all',
    customerFilter: 'all'
  });

  // Compute customer options once when assets change
  const customerOptions = useMemo(() => [
    { label: "All Customers", value: "all" },
    ...Array.from(new Set(assets?.map(asset => asset.customer_id)))
      .filter(Boolean)
      .map(customerId => {
        const asset = assets.find(a => a.customer_id === customerId);
        return {
          label: asset?.customer ? `${asset.customer.first_name} ${asset.customer.last_name}` : 'Unassigned',
          value: String(customerId)
        };
      })
  ], [assets]);

  // Apply filters to assets
  const filteredAssets = useMemo(() => 
    assets?.filter(asset => {
      // Type filter
      if (filters.typeFilter !== "all" && asset.asset_type !== filters.typeFilter) {
        return false;
      }

      // Customer filter
      if (filters.customerFilter !== "all" && String(asset.customer_id) !== filters.customerFilter) {
        return false;
      }
      
      // Search filter
      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          asset.asset_name?.toLowerCase().includes(searchLower) ||
          asset.asset_type?.toLowerCase().includes(searchLower) ||
          asset.asset_size?.toLowerCase().includes(searchLower) ||
          asset.customer?.first_name?.toLowerCase().includes(searchLower) ||
          asset.customer?.last_name?.toLowerCase().includes(searchLower)
        );
      }
      
      return true;
    }) || [], [assets, filters]);

  return {
    filters,
    setFilters,
    customerOptions,
    filteredAssets
  };
}
