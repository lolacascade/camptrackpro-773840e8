
import { Customer } from "./customer";
import { Site } from "./site";
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
  customer?: Customer;
  rv_id: string;
  check_in: string;
  check_out: string;
  status: BookingStatus;
  total_amount: number;
  site_id: string;
  site?: Site;
  special_requirements?: string;
  organization_id: string;
  account_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}
