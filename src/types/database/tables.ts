
export interface GenericSchema {
  Tables: {
    organizations: {
      Row: { id: string; name: string; created_at: string | null; }
      Insert: { id?: string; name: string; created_at?: string | null; }
      Update: { id?: string; name?: string; created_at?: string | null; }
    }
    accounts: {
      Row: { id: string; name: string; organization_id: string; created_at: string | null; }
      Insert: { id?: string; name: string; organization_id: string; created_at?: string | null; }
      Update: { id?: string; name?: string; organization_id?: string; created_at?: string | null; }
    }
    customers: {
      Row: { id: string; first_name: string; last_name: string; email: string | null; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; first_name: string; last_name: string; email?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; first_name?: string; last_name?: string; email?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
    }
    rvs: {
      Row: { id: string; make: string; model: string; year: number | null; site_id: string | null; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; make: string; model: string; year?: number | null; site_id?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; make?: string; model?: string; year?: number | null; site_id?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
    }
    sites: {
      Row: { id: string; name: string; location: string; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; name: string; location: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; name?: string; location?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
    }
    bookings: {
      Row: { id: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status: string; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; customer_id?: string; rv_id?: string; site_id?: string; check_in?: string; check_out?: string; status?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
    }
    user_accounts: {
      Row: { user_id: string; account_id: string; }
      Insert: { user_id: string; account_id: string; }
      Update: { user_id?: string; account_id?: string; }
    }
  }
  Views: Record<string, {
    Row: Record<string, unknown>
  }>
  Functions: Record<string, unknown>
  Enums: Record<string, unknown>
  CompositeTypes: Record<string, {
    [key: string]: unknown
  }>
}

export type Database = GenericSchema;
