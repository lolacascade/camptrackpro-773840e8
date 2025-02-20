
export interface Site {
  id: string;
  name: string;
  location: string;
  organization_id: string;
  account_id: string;
  created_at: string;
}

export interface SiteFormData {
  name: string;
  location: string;
}
