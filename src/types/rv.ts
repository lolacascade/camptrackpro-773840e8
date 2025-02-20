
import { Site } from "./site";
import { Customer } from "./customer";

export interface RV {
  id: string;
  make: string;
  model: string;
  year: number | null;
  site_id: string | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  customer_id?: string;
  customer?: Customer;
  site?: Site;
}

export interface RVFilters {
  searchTerm: string;
  page: number;
}

export interface RVFormData {
  make: string;
  model: string;
  year: number | null;
  site_id?: string | null;
  customer_id?: string | null;
}
