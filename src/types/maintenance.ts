export interface Maintenance {
  id: number;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assigned_to: string | null;
  created_at: string;
  updated_at: string | null;
  completed_at: string | null;
  customer_id: string | null;
  site_id: number | null;
  user_id: string | null;
  organization_id?: string | null;
  account_id?: string | null;
  site?: {
    id: number;
    name: string;
    status: 'available' | 'occupied' | 'maintenance';
  };
}

export type MaintenanceStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';
export type MaintenancePriority = 'low' | 'medium' | 'high';