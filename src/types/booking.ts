export interface Booking {
  id: number;
  customer_id: number;
  check_in_date: string;
  check_out_date: string;
  slot_id: number;
  created_at: string | null;
  special_requirements: string | null;
  status: 'pending' | 'confirmed' | 'checked_in' | 'completed' | 'cancelled';
  reservation_code: string;
  slot?: {
    name: string;
  };
  customer?: {
    name: string;
    email: string;
  };
}