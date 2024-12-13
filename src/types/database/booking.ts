import { TimestampFields } from './common';

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'active' | 'completed';

// Base booking type that matches the database schema
export interface BookingDB extends TimestampFields {
  id: number;
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: BookingStatus;
  reservation_code: string; // Required in DB, but handled by trigger
}

// Type for database insert operations
// Excludes id (auto-generated) and reservation_code (handled by trigger)
export type BookingInsert = Omit<BookingDB, 'id' | 'reservation_code'>;

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

// Form-specific type for handling booking creation/updates
export interface BookingFormValues {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements?: string;
}

// Type for the data displayed in the bookings list/table
export interface BookingData extends Omit<BookingWithRelations, 'customer_id' | 'slot_id'> {
  customer_id: number;
  slot_id: number;
}