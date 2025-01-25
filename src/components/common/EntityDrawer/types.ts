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

export interface EntityDrawerProps {
  entity: any;
  open: boolean;
  onClose: () => void;
  onEntityUpdated: () => void;
  title: string;
  fields: Field[];
  tableName: TableName;
}