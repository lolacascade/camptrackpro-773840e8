export interface Maintenance {
  id: number;
  description: string;
  status: string;
  assigned_to: number | null;
  created_at: string;
  updated_at: string | null;
  completed_at: string | null;
  customer_id: number | null;
  slot_id: number | null;
  user_id: string | null;
}