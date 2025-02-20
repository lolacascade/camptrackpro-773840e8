
export interface Site {
  id: string;
  name: string;
  location: string;
  status: 'available' | 'occupied' | 'maintenance';
  has_water?: boolean;
  electricity_voltage?: number;
  is_covered?: boolean;
  length_ft?: number;
  width_ft?: number;
  created_at: string;
  updated_at: string;
}
