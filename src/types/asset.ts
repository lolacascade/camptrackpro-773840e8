export interface Asset {
  id: string;
  asset_name: string | null;
  asset_size: string | null;
  asset_type: string | null;
  customer_id: string | null;
  slip_id: number | null;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  name: string;
  type: string;
  status: string;
  daily_rate: number;
  customers?: {
    id: string;
    first_name: string;
    last_name: string;
  } | null;
  slots?: {
    id: number;
    name: string;
    dock: string | null;
  } | null;
}