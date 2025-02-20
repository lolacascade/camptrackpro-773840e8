
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  created_at: string | null;
  organization_id: string | null;
  account_id: string | null;
}

export type CustomerCreateInput = Omit<Customer, 'id' | 'created_at'>;
export type CustomerUpdateInput = Partial<CustomerCreateInput>;
