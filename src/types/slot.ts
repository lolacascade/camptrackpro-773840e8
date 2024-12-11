export interface Slot {
  id: number;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  customer_id: number | null;
  maintenance_id: number | null;
  location_coordinates: any | null;
  created_at: string | null;
  updated_at: string | null;
  dock: string | null;
  length_ft: number | null;
  width_ft: number | null;
  is_covered: boolean | null;
  electricity_voltage: string | null;
  has_water: boolean | null;
  zone: string | null;
  location_identifier: string;
  last_activity_at: string | null;
  utility_connection_type: string | null;
  assets?: Array<{
    id: number;
    asset_name: string;
    asset_size: string | null;
    customer_id: number | null;
    customers?: {
      name: string;
    };
  }>;
  maintenance_requests?: Array<{
    description: string;
  }>;
}