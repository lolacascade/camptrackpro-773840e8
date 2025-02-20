
import { Customer } from "@/types/customer";
import { CustomerFormData } from "./types";

export const getDefaultValues = (customer: Customer | null): CustomerFormData => {
  if (customer) {
    return {
      first_name: customer.first_name || '',
      last_name: customer.last_name || '',
      email: customer.email || '',
      phone: customer.phone || ''
    };
  }

  return {
    first_name: '',
    last_name: '',
    email: '',
    phone: ''
  };
};
