
import { Customer } from "../customer";
import { Slot } from "../slot";
import { Site } from "../site";

export type BookingStatus = 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';

export interface BookingFormData {
  customer_id: string;
  asset_id: string;
  site_id: number;
  special_requirements?: string;
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
  status: BookingStatus;
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

export interface BookingInsight {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  cancelledBookings: number;
  avgBookingDuration: number;
}
