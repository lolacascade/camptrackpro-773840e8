export interface BookingDB {
  id: number;
  customer_id: number;
  check_in_date: string;
  check_out_date: string;
  slot_id: number;
  created_at: string;
  special_requirements: string | null;
  status: BookingStatus;
  reservation_code: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'active';

// Form values type for the booking form
export interface BookingFormValues {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements?: string;
}

// Type for database insert operations - exclude auto-generated fields
export type BookingInsert = {
  customer_id: number;
  check_in_date: string;
  check_out_date: string;
  slot_id: number;
  special_requirements?: string | null;
  status?: BookingStatus;
};

// Type for booking with related data
export interface BookingData extends Omit<BookingDB, 'customer_id' | 'slot_id'> {
  customer?: {
    id: number;
    name: string;
    email: string | null;
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

export type BookingWithRelations = BookingData;