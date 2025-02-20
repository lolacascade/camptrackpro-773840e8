
export interface GenericSchema {
  Tables: {
    organizations: {
      Row: { id: string; name: string; created_at: string | null; }
      Insert: { id?: string; name: string; created_at?: string | null; }
      Update: { id?: string; name?: string; created_at?: string | null; }
      Relationships: []
    }
    accounts: {
      Row: { id: string; name: string; organization_id: string; created_at: string | null; }
      Insert: { id?: string; name: string; organization_id: string; created_at?: string | null; }
      Update: { id?: string; name?: string; organization_id?: string; created_at?: string | null; }
      Relationships: []
    }
    customers: {
      Row: { id: string; first_name: string; last_name: string; email: string | null; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; first_name: string; last_name: string; email?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; first_name?: string; last_name?: string; email?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    rvs: {
      Row: { id: string; make: string; model: string; year: number | null; site_id: string | null; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; make: string; model: string; year?: number | null; site_id?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; make?: string; model?: string; year?: number | null; site_id?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    sites: {
      Row: { id: string; name: string; location: string; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; name: string; location: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; name?: string; location?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    bookings: {
      Row: { id: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status: string; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; customer_id?: string; rv_id?: string; site_id?: string; check_in?: string; check_out?: string; status?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    user_accounts: {
      Row: { user_id: string; account_id: string; }
      Insert: { user_id: string; account_id: string; }
      Update: { user_id?: string; account_id?: string; }
      Relationships: []
    }
  }
  Views: Record<string, { Row: Record<string, unknown> }>
  Functions: Record<string, unknown>
  Enums: Record<string, unknown>
  CompositeTypes: Record<string, { [key: string]: unknown }>
}

export type Tables = GenericSchema["Tables"];
export type TablesInsert<T extends keyof Tables> = Tables[T]["Insert"];
export type TablesUpdate<T extends keyof Tables> = Tables[T]["Update"];
export type TablesRow<T extends keyof Tables> = Tables[T]["Row"];
