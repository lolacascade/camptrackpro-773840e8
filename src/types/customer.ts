export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;
  created_at: string;
  updated_at: string;
  user_id?: string | null;
  lifetime_value?: number | null;
  assets?: Array<{
    id: string;
    asset_name: string;
    asset_type: string;
    asset_size: string;
  }>;
}