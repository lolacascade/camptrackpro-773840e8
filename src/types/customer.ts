
export interface Customer {
  id: string;
  first_name: string;
  last_name: string;
  email: string | null;
  phone: string | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
}

export interface CustomerFilters {
  searchTerm: string;
  page: number;
}
