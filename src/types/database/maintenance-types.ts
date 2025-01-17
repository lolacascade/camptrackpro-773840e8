export interface MaintenanceTypes {
  Row: {
    id: number;
    description: string;
    status: string;
    priority: string;
    customer_id: number | null;
    slot_id: number | null;
    assigned_to: number | null;
    created_at: string | null;
    updated_at: string | null;
    completed_at: string | null;
    user_id: string | null;
  };
  Insert: {
    id?: number;
    description: string;
    status: string;
    priority?: string;
    customer_id?: number | null;
    slot_id?: number | null;
    assigned_to?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    completed_at?: string | null;
    user_id?: string | null;
  };
  Update: {
    id?: number;
    description?: string;
    status?: string;
    priority?: string;
    customer_id?: number | null;
    slot_id?: number | null;
    assigned_to?: number | null;
    created_at?: string | null;
    updated_at?: string | null;
    completed_at?: string | null;
    user_id?: string | null;
  };
}