
import { Site } from "./site";

export interface Asset {
  id: string;
  make: string;
  model: string;
  year: number | null;
  site_id: string | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  site?: Site;
}

export interface AssetFilters {
  searchTerm: string;
  page: number;
}
