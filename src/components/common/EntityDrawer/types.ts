export type FormValue = string | number | null | undefined;

export interface FormDataType {
  [key: string]: FormValue;
}

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  required?: boolean;
  options?: { value: string; label: string }[];
}

export interface FormField extends Field {
  value: FormValue;
  onChange: (value: FormValue) => void;
}

export type TableName = 'customers' | 'assets' | 'slots' | 'bookings' | 'maintenance_requests' | 'expenses';

export interface EntityDrawerProps {
  entity: any;
  open: boolean;
  onClose: () => void;
  onEntityUpdated: () => void;
  title: string;
  fields: Field[];
  tableName: TableName;
}