export interface PersonName {
  first_name?: string;
  last_name?: string;
}

export interface Profile {
  id: string;
  role: 'admin' | 'customer' | 'staff' | 'manager';
  first_name?: string;
  last_name?: string;
}