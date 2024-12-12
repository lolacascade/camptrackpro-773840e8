export interface Booking {
  id: number;
  customer: {
    name: string;
    email: string;
    isVIP?: boolean;
  };
  slot: {
    name: string;
  };
  check_in_date: string;
  check_out_date: string;
  status: 'pending' | 'checked_in' | 'overdue' | 'completed';
  priority: 'high' | 'medium' | 'low';
}