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

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';

// Type for database insert operations - exclude auto-generated fields
export type BookingInsert = Omit<BookingDB, 'id' | 'created_at' | 'reservation_code'>;

// Type for booking with related data
export interface BookingData extends BookingDB {
  customer?: CustomerData;
  slot?: SlotData;
}

export interface CustomerData {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
}

export interface SlotData {
  id: number;
  name: string;
  dock: string | null;
  status: string;
}