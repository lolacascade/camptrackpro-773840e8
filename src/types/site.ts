
export interface Site {
  id: string;
  name: string;
  location: string;
  status: 'available' | 'occupied' | 'maintenance';
  created_at: string;
  updated_at: string;
}
