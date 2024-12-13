export interface Asset {
  id: number;
  asset_name: string;
  asset_size: string | null;
  asset_type: string | null;
  customer_id: number | null;
  slip_id: number;
  user_id: string | null;
  created_at: string | null;
  updated_at: string | null;
  customers?: {
    id: number;
    name: string;
  } | null;
  slots?: {
    id: number;
    name: string;
    dock: string | null;
  } | null;
}