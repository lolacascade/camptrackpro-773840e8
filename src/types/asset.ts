
import { Customer } from "./customer";
import { Site } from "./site";

export type AssetStatus = 'available' | 'occupied' | 'maintenance';
export type AssetType = 'class_a' | 'class_b' | 'class_c' | 'travel_trailer' | 'fifth_wheel' | 'popup';
export type AssetSize = 'small' | 'medium' | 'large';

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
  status: AssetStatus;
  asset_type: AssetType;
  asset_size: AssetSize;
  customer?: Customer;
  site?: Site;
}

export interface AssetFilters {
  searchTerm: string;
  status: AssetStatus | null;
  assetType: AssetType | null;
  page: number;
}
