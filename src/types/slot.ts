import { Json } from "@/integrations/supabase/types";
import { BaseEntity } from "./common/base";

export interface Slot extends BaseEntity {
  id: number;  // Changed from string | number to just number
  name: string;
  status: 'available' | 'occupied' | 'maintenance';  // Made this a union type
  location_identifier: string;
  length_ft: number | null;
  width_ft: number | null;
  is_covered: boolean | null;
  has_water: boolean | null;
  electricity_voltage: string | null;
  utility_connection_type: string | null;
  location_coordinates: Json | null;
  customer_id: string | null;
  maintenance_id: number | null;
  last_activity_at: string | null;
  user_id: string | null;
}