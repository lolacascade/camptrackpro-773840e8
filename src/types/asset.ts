
export interface Asset {
  id: string;
  make: string;
  model: string;
  year: number | null;
  status: 'available' | 'occupied' | 'maintenance';
  customer_id: string | null;
  site_id: string | null;
  organization_id: string;
  account_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  // Optional relations
  customer?: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  site?: {
    id: string;
    name: string;
  };
}
