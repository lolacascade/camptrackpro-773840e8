
import { Site } from "./site";
import { Customer } from "./customer";

export type RVPricingCategory = 'up_to_15' | 'up_to_20' | 'up_to_30' | 'up_to_35' | 'up_to_40';
export type AssetStatus = 'available' | 'occupied' | 'maintenance';

export interface Asset {
  id: string;
  name: string;
  type: string;
  status: AssetStatus;
  daily_rate: number | null;
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
  pricing_category?: RVPricingCategory;
  created_at: string;
  updated_at: string;
}
