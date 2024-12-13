export interface Asset {
  id: number;
  asset_name: string;
  asset_size: string | null;
  customer_id: number | null;
  asset_type: string;
  slip_id: number | null;
  user_id: string | null;
  slots?: {
    id: number;
    name: string;
    dock: string;
  } | null;
  customers?: {
    id: number;
    name: string;
  } | null;
}