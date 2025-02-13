
import { Customer } from "./customer";
import { Slot } from "./slot";
import { Site } from "./site";
import { DateRange } from "react-day-picker";

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled' | 'all';

export interface BookingFilters {
  searchTerm: string;
  status: BookingStatus;
  page: number;
  dateRange: DateRange | null;
}

export interface Booking {
  id: string;
  customer_id: string;
  customer?: Customer;
  asset_id: string;
  asset?: {
    id: string;
    asset_name?: string;
    name?: string;
  };
  check_in_date: string;
  check_out_date: string;
  status: Exclude<BookingStatus, 'all'>;
  total_amount: number;
  site_id?: number;
  site?: Site;
  slot?: Slot;
  special_requirements?: string;
  reservation_code?: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
  organization_id?: string;
  account_id?: string;
}

