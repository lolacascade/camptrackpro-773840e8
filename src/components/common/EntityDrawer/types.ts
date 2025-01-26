import { ReactNode } from "react";

export type TableName = 
  | "sites" 
  | "customers" 
  | "assets" 
  | "bookings" 
  | "maintenance_requests" 
  | "expenses" 
  | "invoices";

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
  onEntityUpdated: () => void;
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