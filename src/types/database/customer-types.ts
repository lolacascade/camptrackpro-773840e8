
import { Customer } from "../customer";
import { RV } from "../rv";

export interface CustomerWithRVs extends Customer {
  rvs: RV[];
}

export interface CustomerFormData {
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
}
