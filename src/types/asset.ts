import { Site } from "./site";
import { Customer } from "./customer";

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
  daily_rate: number;
  asset_name: string | null;
  asset_size: string | null;
  asset_type: string | null;
  site_id: number | null;
  customer_id: string | null;
  customer?: Customer | null;
  site?: Site | null;
  user_id: string | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string;
  updated_at: string;
}