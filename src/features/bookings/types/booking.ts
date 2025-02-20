
import { Booking as BaseBooking, BookingStatus } from '@/types/booking';

// Extended booking type for feature-specific functionality
export interface FeatureBooking extends BaseBooking {
  payment_status?: 'pending' | 'paid' | 'refunded';
  check_in_time?: string;
  check_out_time?: string;
  notes?: string[];
}

// Feature-specific booking form data
export interface BookingFormData {
  customer_id: string;
  rv_id: string;
  site_id: string;
  check_in: string;
  check_out: string;
  special_requirements?: string;
}
