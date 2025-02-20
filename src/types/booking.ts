
import { Customer } from "./customer";
import { Site } from "./site";
import { DateRange } from "react-day-picker";

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';

export interface BookingFilters {
  searchTerm: string;
  status: BookingStatus | 'all';
  page: number;
  dateRange: DateRange | null;
}

export interface Booking {
  id: string;
  customer_id: string;
  rv_id: string;
  site_id: string;
  check_in: string;
  check_out: string;
  status: BookingStatus;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  total_amount: number | null;
  special_requirements: string | null;
  customer?: Customer;
  site?: Site;
}
