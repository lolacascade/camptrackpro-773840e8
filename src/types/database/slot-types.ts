import { Json } from './common';

export interface SlotTypes {
  Row: {
    id: number;
    name: string;
    location_identifier: string;
    status: string;
    dock: string | null;
    zone: string | null;
    length_ft: number | null;
    width_ft: number | null;
    is_covered: boolean | null;
    has_water: boolean | null;
    electricity_voltage: string | null;
    utility_connection_type: string | null;
    location_coordinates: Json | null;
    customer_id: number | null;
    maintenance_id: number | null;
    created_at: string | null;
    updated_at: string | null;
    last_activity_at: string | null;
    user_id: string | null;
  };
  Insert: {
    id?: number;
    name: string;
    location_identifier?: string;
    status: string;
    dock?: string | null;
    zone?: string | null;
    length_ft?: number | null;
    width_ft?: number | null;
    is_covered?: boolean | null;
    has_water?: boolean | null;
    electricity_voltage?: string | null;
    utility_connection_type?: string | null;
    location_coordinates?: Json | null;
    customer_id?: number | null;
    maintenance_id?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    last_activity_at?: string | null;
    user_id?: string | null;
  };
  Update: {
    id?: number;
    name?: string;
    location_identifier?: string;
    status?: string;
    dock?: string | null;
    zone?: string | null;
    length_ft?: number | null;
    width_ft?: number | null;
    is_covered?: boolean | null;
    has_water?: boolean | null;
    electricity_voltage?: string | null;
    utility_connection_type?: string | null;
    location_coordinates?: Json | null;
    customer_id?: number | null;
    maintenance_id?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    last_activity_at?: string | null;
    user_id?: string | null;
  };
}