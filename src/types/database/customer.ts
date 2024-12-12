export type Customer = {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  user_id?: string | null;
  lifetime_value?: number | null;
};

export type CustomerNote = {
  id: number;
  customer_id?: number | null;
  note?: string | null;
  tag?: string | null;
  created_at?: string | null;
};

export type CustomerPreference = {
  id: number;
  customer_id?: number | null;
  preferred_slot_id?: number | null;
  preferred_zone?: string | null;
  last_updated?: string | null;
};