export interface BookingFormValues {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements?: string;
}

export interface BookingData {
  id: number;
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
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
}

// Type for inserting a new booking - includes reservation_code as it's required by Supabase
export interface BookingInsertData {
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements?: string | null;
  status: string;
  reservation_code?: string; // Added this as it's required by Supabase
}