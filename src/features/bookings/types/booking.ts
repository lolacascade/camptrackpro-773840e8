
import { Customer } from "@/types/customer";
import { Site } from "@/types/site";
import { Asset } from "@/types/asset";
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
  asset?: Asset;
  check_in: string;
  check_out: string;
  status: BookingStatus;
  site_id: string;
  site?: Site;
  total_amount: number;
  organization_id: string;
  account_id: string;
  user_id: string;
  special_requirements?: string;
  reservation_code?: string;
  created_at: string;
  updated_at: string;
}
