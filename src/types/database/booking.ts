// Database types that match Supabase schema
export interface BookingDB {
  id: number;
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: BookingStatus;
  reservation_code: string;
  created_at?: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled';

// Type for inserting new bookings
export interface BookingInsert {
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements?: string | null;
  status?: BookingStatus;
}

// Type for booking with related data
export interface BookingWithRelations extends BookingDB {
  customer?: {
    id: number;
    name: string;
    email: string;
  };
  slot?: {
    id: number;
    name: string;
  };
  assets?: {
    asset_name: string;
    asset_type: string;
  }[];
}

// Type for form data
export interface BookingFormData {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements?: string;
}