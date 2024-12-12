export type AuthUser = {
  id: string;
  email?: string | null;
};

export type Profile = {
  id: string;
  email?: string | null;
  is_subscribed?: boolean | null;
  stripe_customer_id?: string | null;
  created_at: string;
  updated_at: string;
};