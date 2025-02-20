
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  organization_id: string;
  account_id: string;
  created_at: string;
  updated_at: string;
}
