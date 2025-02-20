
import { Booking as BaseBooking, BookingStatus } from '@/types/booking';

// Feature-specific booking form data
export interface BookingFormData {
  customer_id: string;
  rv_id: string;
  site_id: string;
  check_in: string;
  check_out: string;
  special_requirements?: string;
}
