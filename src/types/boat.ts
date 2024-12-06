export interface Boat {
  id: number;
  boat_name: string;
  boat_size: string | null;
  customer_id: number | null;
  slip_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  customers?: {
    name: string;
  };
}