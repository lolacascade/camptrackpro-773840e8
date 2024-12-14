export interface Customer {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  address: string | null;
  created_at: string | null;
  updated_at: string | null;
  lifetime_value: number | null;
  assets?: Array<{
    asset_name: string;
  }>;
}