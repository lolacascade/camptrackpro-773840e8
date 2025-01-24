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

export interface EntityDrawerProps {
  entity: any; // Simplified from FormDataType to any
  open: boolean;
  onClose: () => void;
  onEntityUpdated: () => void;
  title: string;
  fields: Field[];
  tableName: string;
}