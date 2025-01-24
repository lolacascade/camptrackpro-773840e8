import type { Database } from "@/integrations/supabase/types"

// Get table names from Database type, excluding views since they don't support CRUD
type DatabaseTables = Database['public']['Tables']
export type TableNames = keyof DatabaseTables

export type FormValue = string | number | null | undefined;

// Add index signature to make it compatible with dynamic form data
export interface FormDataType {
  [key: string]: FormValue;
  id?: string | number;
  user_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface EntityDrawerProps {
  entity: FormDataType | null;
  open: boolean;
  onClose: () => void;
  onEntityUpdated: () => void;
  title: string;
  fields: Field[];
  tableName: TableNames;
}

export interface FormField extends Field {
  value: FormValue;
  onChange: (value: FormValue) => void;
}