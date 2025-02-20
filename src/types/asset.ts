
import { Customer } from "./customer";
import { Site } from "./site";

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
  customer?: Customer;
  site?: Site;
}

export interface AssetFilters {
  searchTerm: string;
  page: number;
}
