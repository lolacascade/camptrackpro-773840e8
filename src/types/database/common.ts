export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface TimestampFields {
  created_at?: string | null;
  updated_at?: string | null;
}