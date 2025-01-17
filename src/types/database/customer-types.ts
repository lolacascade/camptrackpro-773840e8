export interface CustomerTypes {
  Row: {
    id: number;
    name: string;
    email: string | null;
    phone: string | null;
    address: string | null;
    created_at: string | null;
    updated_at: string | null;
    user_id: string | null;
    lifetime_value: number | null;
  };
  Insert: {
    id?: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    user_id?: string | null;
    lifetime_value?: number | null;
  };
  Update: {
    id?: number;
    name?: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    user_id?: string | null;
    lifetime_value?: number | null;
  };
}