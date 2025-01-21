export interface BaseEntity {
  id: string | number;  // Allow both string and number IDs
  created_at: string;
  updated_at: string;
  user_id: string | null;
}