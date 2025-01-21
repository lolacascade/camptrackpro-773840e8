export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
  user_id: string | null;
}