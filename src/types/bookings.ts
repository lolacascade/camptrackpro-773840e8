export interface BookingFormValues {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements: string;
}

// Type for data coming from the database
export interface BookingData {
  id?: number;
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
  reservation_code?: string;
  created_at?: string;
}

// Type specifically for creating a new booking
export type CreateBookingData = {
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: 'pending';
};