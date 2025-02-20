
import { Customer } from "./customer";
import { Site } from "./site";
import { Asset } from "./asset";
import { DateRange } from "react-day-picker";

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
export type BookingStatusFilter = BookingStatus | 'all';

export interface BookingFilters {
  searchTerm: string;
  status: BookingStatusFilter;
  page: number;
  dateRange: DateRange | null;
}

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
