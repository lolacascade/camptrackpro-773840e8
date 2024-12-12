export interface Asset {
  id: number;
  asset_name: string;
  asset_size: string | null;
  customer_id: number | null;
  asset_type: string;
  customers?: {
    id: number;
    name: string;
  };
  slots?: {
    id: number;
    name: string;
    dock?: string;
  };
}