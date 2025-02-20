
export interface Asset {
  id: string;
  make: string;
  model: string;
  year: number | null;
  customer_id: string | null;
  site_id: string | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  status?: 'available' | 'occupied' | 'maintenance';
  asset_type?: string;
  asset_size?: string;
  customer?: Customer;
  site?: Site;
}

export interface AssetFilters {
  searchTerm: string;
  status: string | null;
  assetType: string | null;
  page: number;
}
