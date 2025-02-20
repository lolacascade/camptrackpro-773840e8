
import { Customer } from "./customer";

export interface RV {
  id: string;
  make: string;
  model: string;
  year: number | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  customer_id?: string;
  customer?: Customer;
}

export interface RVFormData {
  make: string;
  model: string;
  year: number | null;
}
