import { Site } from "./site";
import { Customer } from "./customer";

export type RVPricingCategory = 'up_to_15' | 'up_to_20' | 'up_to_30' | 'up_to_35' | 'up_to_40';

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
  pricing_category?: RVPricingCategory;
  created_at: string;
  updated_at: string;
}

export const RV_TYPE_TO_CATEGORY: Record<string, RVPricingCategory> = {
  'Class A': 'up_to_40',
  'Class B': 'up_to_20',
  'Van': 'up_to_20',
  'Class C': 'up_to_30',
  'Travel Trailer': 'up_to_30',
  'Fifth Wheel': 'up_to_35',
  'Toy Hauler': 'up_to_35',
  'Pop-up Camper': 'up_to_15',
  'Truck Camper': 'up_to_15',
  'Teardrop': 'up_to_15'
};