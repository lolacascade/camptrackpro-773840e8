
import { Customer } from "@/types/customer";

export interface CustomerFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface UseCustomerFormProps {
  customer: Customer | null;
  onCustomerUpdated: () => void;
  onClose: () => void;
}
