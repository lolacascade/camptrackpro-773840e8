
export type GenericSchema = {
  Tables: {
    organizations: {
      Row: { id: string; name: string; created_at: string; }
      Insert: { id?: string; name: string; created_at?: string; }
      Update: { id?: string; name?: string; created_at?: string; }
    }
    accounts: {
      Row: { id: string; name: string; organization_id: string; created_at: string; }
      Insert: { id?: string; name: string; organization_id: string; created_at?: string; }
      Update: { id?: string; name?: string; organization_id?: string; created_at?: string; }
    }
    customers: {
      Row: { id: string; first_name: string; last_name: string; email: string | null; phone: string | null; organization_id: string; account_id: string; created_at: string; }
      Insert: { id?: string; first_name: string; last_name: string; email?: string | null; phone?: string | null; organization_id: string; account_id: string; created_at?: string; }
      Update: { id?: string; first_name?: string; last_name?: string; email?: string | null; phone?: string | null; organization_id?: string; account_id?: string; created_at?: string; }
    }
    rvs: {
      Row: { id: string; make: string; model: string; year: number | null; customer_id: string | null; site_id: string | null; organization_id: string; account_id: string; created_at: string; }
      Insert: { id?: string; make: string; model: string; year?: number | null; customer_id?: string | null; site_id?: string | null; organization_id: string; account_id: string; created_at?: string; }
      Update: { id?: string; make?: string; model?: string; year?: number | null; customer_id?: string | null; site_id?: string | null; organization_id?: string; account_id?: string; created_at?: string; }
    }
    sites: {
      Row: { id: string; name: string; location: string; organization_id: string; account_id: string; created_at: string; }
      Insert: { id?: string; name: string; location: string; organization_id: string; account_id: string; created_at?: string; }
      Update: { id?: string; name?: string; location?: string; organization_id?: string; account_id?: string; created_at?: string; }
    }
    bookings: {
      Row: { id: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status: string; total_amount: number; special_requirements: string | null; organization_id: string; account_id: string; created_at: string; }
      Insert: { id?: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status?: string; total_amount?: number; special_requirements?: string | null; organization_id: string; account_id: string; created_at?: string; }
      Update: { id?: string; customer_id?: string; rv_id?: string; site_id?: string; check_in?: string; check_out?: string; status?: string; total_amount?: number; special_requirements?: string | null; organization_id?: string; account_id?: string; created_at?: string; }
    }
    user_accounts: {
      Row: { user_id: string; account_id: string; }
      Insert: { user_id: string; account_id: string; }
      Update: { user_id?: string; account_id?: string; }
    }
    user_organizations: {
      Row: { id: string; user_id: string; organization_id: string; created_at: string; updated_at: string; }
      Insert: { id?: string; user_id: string; organization_id: string; created_at?: string; updated_at?: string; }
      Update: { id?: string; user_id?: string; organization_id?: string; created_at?: string; updated_at?: string; }
    }
  }
  Views: {
    [key: string]: {
      Row: Record<string, unknown>
    }
  }
  Functions: {
    [key: string]: unknown
  }
  Enums: {
    [key: string]: unknown
  }
}

export type Database = GenericSchema;

export type Tables = GenericSchema['Tables'];
