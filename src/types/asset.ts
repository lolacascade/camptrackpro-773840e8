
import { Customer } from "./customer";
import { Site } from "./site";

export interface Asset {
  id: string;
  make: string;
  model: string;
  year: number | null;
  customer_id: string | null;
  customer?: Customer;
  site_id: string | null;
  site?: Site;
  created_at: string;
  updated_at: string;
}

export type AssetFilterState = {
  searchTerm: string;
  selectedStatus: string | null;
  selectedType: string | null;
};
