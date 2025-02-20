
import { Booking as BaseBooking } from '@/types/booking';

export interface BookingFormData {
  customer_id: string;
  rv_id: string;
  site_id: string;
  check_in: string;
  check_out: string;
  special_requirements?: string;
  total_amount?: number;
}
