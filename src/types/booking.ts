export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

export interface Booking {
  id: string;
  customer_id: string;
  asset_id: string;
  check_in_date: string;
  check_out_date: string;
  status: BookingStatus;
  total_amount: number;
  created_by: string;
  created_at: string | null;
  updated_at: string | null;
  slot_id: number | null;
  special_requirements: string | null;
  reservation_code: string | null;
  user_id: string | null;
  slot?: {
    name: string;
  };
  customer?: {
    name: string;
    email: string;
  };
}