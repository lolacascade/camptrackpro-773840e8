
import { Customer } from "./customer";
import { RV } from "./rv";
import { Site } from "./site";
import { DateRange } from "react-day-picker";

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'checked_in';

export interface BookingFilters {
  searchTerm?: string;
  status?: BookingStatus | 'all';
  page: number;
  dateRange: DateRange | null;
}

export interface BookingFormData {
  customer_id: string;
  rv_id: string;
  site_id: string;
  check_in: Date;
  check_out: Date;
  status: BookingStatus;
  special_requirements?: string;
  total_amount?: number;
}

export interface Booking {
  id: string;
  customer_id: string | null;
  rv_id: string | null;
  site_id: string | null;
  check_in: string;
  check_out: string;
  status: BookingStatus;
  special_requirements: string | null;
  total_amount: number | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  customer?: Customer;
  rv?: RV;
  site?: Site;
}
