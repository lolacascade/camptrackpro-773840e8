
import { Customer } from "./customer";
import { Site } from "./site";
import { Asset } from "./asset";

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customer_id: string;
  rv_id: string;
  check_in: string;
  check_out: string;
  status: BookingStatus;
  site_id: string;
  total_amount: number;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  customer?: Customer;
  site?: Site;
  asset?: Asset;
  special_requirements?: string;
}
