
import { ReactNode } from "react";

export type TableName = 
  | "sites" 
  | "customers" 
  | "rvs"
  | "bookings" 
  | "maintenance_requests" 
  | "expenses" 
  | "invoices"
  | "profiles"
  | "chat_history"
  | "password_reset_attempts"
  | "customer_notes"
  | "booking_trends_data"
  | "marina_details";

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date' | 'textarea' | 'checkbox';
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface FormField extends Field {
  value: any;
  onChange: (value: any) => void;
}

export interface EntityDrawerProps {
  entity: any;
  open: boolean;
  onClose: () => void;
  onEntityUpdated: (entity?: any) => void;
  title: string;
  fields: Field[];
  tableName: TableName;
}

export interface UseEntityFormReturn {
  formData: any;
  setFormData: (value: any) => void;
  isDeleting: boolean;
  isSaving: boolean;
  handleSave: () => Promise<void>;
  handleDelete: () => Promise<void>;
}
