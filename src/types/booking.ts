import { Customer } from "./customer";
import { Slot } from "./slot";

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
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  total_amount: number;
  slot_id?: number;
  slot?: Slot;
  special_requirements?: string;
  reservation_code?: string;
  created_at: string;
  updated_at: string;
  user_id?: string;
}