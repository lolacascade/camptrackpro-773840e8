export type Booking = {
  id: number;
  customer_id: number;
  check_in_date: string;
  check_out_date: string;
  slot_id: number;
  created_at?: string | null;
  special_requirements?: string | null;
};

export type BookingAsset = {
  id: number;
  booking_id?: number | null;
  asset_id?: number | null;
  created_at?: string | null;
};