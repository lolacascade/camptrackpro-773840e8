export * from './database/booking';

// Form-specific type for handling booking creation/updates
export interface BookingFormValues {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements?: string;
}

// Type for the data displayed in the bookings list/table
export type BookingData = {
  id: number;
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements?: string | null;
  status: string;
  reservation_code: string;
  created_at?: string;
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
};

// Additional booking-related types
export interface BookingFilters {
  status?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  customerIds?: number[];
  slotIds?: number[];
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
}