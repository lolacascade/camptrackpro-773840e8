export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

// Common database types
export interface TimestampFields {
  created_at?: string;
  updated_at?: string;
}

export interface UserFields {
  user_id?: string;
}