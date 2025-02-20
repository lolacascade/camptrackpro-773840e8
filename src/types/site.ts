
export type SiteStatus = 'available' | 'occupied' | 'maintenance';

export interface Site {
  id: string;
  name: string;
  location: string;
  status: SiteStatus;
  organization_id: string | null;
  account_id: string | null;
  created_at: string | null;
  length_ft?: number;
  width_ft?: number;
  has_water?: boolean;
  electricity_voltage?: number;
  is_covered?: boolean;
}

export interface SiteFilters {
  searchTerm: string;
  status: SiteStatus | null;
  page: number;
}
