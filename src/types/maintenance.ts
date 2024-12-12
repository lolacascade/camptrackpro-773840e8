export interface Maintenance {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
  created_at: string;
  asset_id?: number;
  assets?: {
    id: number;
    asset_name: string;
  };
}