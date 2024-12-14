export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  created_at: string | null;
  updated_at: string | null;
  lifetime_value: number | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  emergency_contact_relationship: string | null;
  assets?: Array<{
    asset_name: string;
  }>;
}