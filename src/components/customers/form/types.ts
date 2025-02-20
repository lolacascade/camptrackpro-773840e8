
import { Customer } from "@/types/customer";

export interface CustomerFormData {
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
}

export interface UseCustomerFormProps {
  customer?: Customer;
  onCustomerUpdated: () => void;
  onClose: () => void;
}
