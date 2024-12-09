export interface Slip {
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
  dock_number: string;
  last_activity_at: string | null;
  power_connection_type: string | null;
  boats?: Array<{
    id: number;
    boat_name: string;
    boat_size: string | null;
    customer_id: number | null;
    customers?: {
      name: string;
    };
  }>;
  maintenance_requests?: Array<{
    description: string;
  }>;
}