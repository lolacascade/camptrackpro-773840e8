export interface Maintenance {
  id: number;
  description: string;
  status: string;
  priority: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string | null;
  completed_at: string | null;
  customer_id: string | null;
  slot_id: number | null;
  user_id: string | null;
}

export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed';
export type MaintenancePriority = 'low' | 'medium' | 'high';