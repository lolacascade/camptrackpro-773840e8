export interface Asset {
  id: number;
  asset_name: string;
  asset_size: string | null;
  customer_id: number | null;
  slot_id?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  asset_type: string;
  customers?: {
    name: string;
  };
}