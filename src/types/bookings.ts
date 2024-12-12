export interface BookingFormValues {
  customerId: string;
  slotId: string;
  checkInDate: Date;
  checkOutDate: Date;
  specialRequirements: string;
}

export interface BookingData {
  customer_id: number;
  slot_id: number;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  status: 'pending' | 'confirmed' | 'cancelled';
}