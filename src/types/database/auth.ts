export type AuthUser = {
  id: string;
  email?: string | null;
};

export type Profile = {
  id: string;
  email?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  role: 'admin' | 'staff' | 'customer';  // Removed 'manager' to match database enum
  created_at: string;
  updated_at: string;
  organization_id?: string | null;
  account_id?: string | null;
};