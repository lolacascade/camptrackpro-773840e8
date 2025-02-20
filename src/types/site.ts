
export interface Site {
  id: string;
  name: string;
  location: string;
  status: 'available' | 'occupied' | 'maintenance';
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  length_ft?: number;
  width_ft?: number;
  has_water?: boolean;
  electricity_voltage?: number;
  is_covered?: boolean;
}
