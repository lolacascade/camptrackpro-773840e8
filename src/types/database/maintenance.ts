export type MaintenanceRequest = {
  id: number;
  slot_id?: number | null;
  customer_id?: number | null;
  description: string;
  status: string;
  assigned_to?: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  completed_at?: string | null;
  user_id?: string | null;
};

export type MaintenanceInventory = {
  id: number;
  item_name: string;
  quantity: number;
  restock_threshold: number;
  last_updated?: string | null;
};