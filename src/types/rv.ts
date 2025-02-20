
export interface RV {
  id: string;
  make: string;
  model: string;
  year: number | null;
  site_id: string | null;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
}

export interface RVFilters {
  searchTerm: string;
  page: number;
}
