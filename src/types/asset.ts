
import { Customer } from "./customer";
import { Site } from "./site";

export interface Asset {
  id: string;
  make: string;
  model: string;
  year: number | null;
  customer_id: string | null;
  site_id: string | null;
  asset_name?: string;
  asset_type?: string;
  asset_size?: string;
  status?: string;
  customer?: Customer;
  site?: Site;
  created_at: string;
  updated_at: string;
}

export type AssetFilterState = {
  searchTerm: string;
  selectedStatus: string | null;
  selectedType: string | null;
};
