
export interface Site {
  id: string;
  name: string;
  status: 'available' | 'occupied' | 'maintenance';
  location_identifier: string;
  length_ft: number | null;
  width_ft: number | null;
  is_covered: boolean | null;
  has_water: boolean | null;
  electricity_voltage: string | null;
  customer_id: string | null;
  organization_id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
}
