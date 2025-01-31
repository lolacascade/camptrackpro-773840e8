import { Customer } from "@/types/customer";
import { CustomerFormData } from "./types";

export const getDefaultValues = (customer: Customer | null): CustomerFormData => {
  console.log('Getting default values for customer:', customer); // Debug log
  
  if (customer) {
    return {
      first_name: customer.first_name || '',
      last_name: customer.last_name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || '',
      state: customer.state || '',
      country: customer.country || '',
      postal_code: customer.postal_code || ''
    };
  }

  return {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  };
};