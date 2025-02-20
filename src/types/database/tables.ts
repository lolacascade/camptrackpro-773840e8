
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
    sites: {
      Row: { id: string; name: string; location: string; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; name: string; location: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; name?: string; location?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    rvs: {
      Row: { id: string; make: string; model: string; year: number | null; site_id: string | null; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; make: string; model: string; year?: number | null; site_id?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; make?: string; model?: string; year?: number | null; site_id?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    customers: {
      Row: { id: string; first_name: string; last_name: string; email: string | null; organization_id: string | null; account_id: string | null; created_at: string | null; }
      Insert: { id?: string; first_name: string; last_name: string; email?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Update: { id?: string; first_name?: string; last_name?: string; email?: string | null; organization_id?: string | null; account_id?: string | null; created_at?: string | null; }
      Relationships: []
    }
    bookings: {
      Row: { id: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status: string; organization_id: string | null; account_id: string | null; created_at: string | null; total_amount: number | null; special_requirements: string | null; }
      Insert: { id?: string; customer_id: string; rv_id: string; site_id: string; check_in: string; check_out: string; status?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; total_amount?: number | null; special_requirements?: string | null; }
      Update: { id?: string; customer_id?: string; rv_id?: string; site_id?: string; check_in?: string; check_out?: string; status?: string; organization_id?: string | null; account_id?: string | null; created_at?: string | null; total_amount?: number | null; special_requirements?: string | null; }
      Relationships: []
    }
    user_accounts: {
      Row: { user_id: string; account_id: string; }
      Insert: { user_id: string; account_id: string; }
      Update: { user_id?: string; account_id?: string; }
      Relationships: []
    }
    user_organizations: {
      Row: { id: string; user_id: string | null; organization_id: string | null; created_at: string | null; updated_at: string | null; }
      Insert: { id?: string; user_id?: string | null; organization_id?: string | null; created_at?: string | null; updated_at?: string | null; }
      Update: { id?: string; user_id?: string | null; organization_id?: string | null; created_at?: string | null; updated_at?: string | null; }
      Relationships: []
    }
    organization_roles: {
      Row: { id: string; user_id: string; organization_id: string; role: string; created_at: string | null; }
      Insert: { id?: string; user_id: string; organization_id: string; role: string; created_at?: string | null; }
      Update: { id?: string; user_id?: string; organization_id?: string; role?: string; created_at?: string | null; }
      Relationships: []
    }
    account_roles: {
      Row: { id: string; user_id: string; account_id: string; role: string; created_at: string | null; }
      Insert: { id?: string; user_id: string; account_id: string; role: string; created_at?: string | null; }
      Update: { id?: string; user_id?: string; account_id?: string; role?: string; created_at?: string | null; }
      Relationships: []
    }
  }
  Views: Record<string, never>
  Functions: Record<string, {
    Args: Record<string, unknown>
    Returns: unknown
  }>
  Enums: Record<string, never>
  CompositeTypes: Record<string, never>
}

export type Database = GenericSchema;
export type TableName = keyof Database["Tables"];
export type TablesInsert<T extends TableName> = Database["Tables"][T]["Insert"];
export type TablesUpdate<T extends TableName> = Database["Tables"][T]["Update"];
export type TablesRow<T extends TableName> = Database["Tables"][T]["Row"];
