
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  created_at: string;
  updated_at: string;
}

// Optional fields for create/update operations
export type CustomerCreateInput = Omit<Customer, 'id' | 'created_at' | 'updated_at'>;
export type CustomerUpdateInput = Partial<CustomerCreateInput>;
