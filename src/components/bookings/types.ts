import { DateRange } from "react-day-picker";
import { Customer } from "@/types/customer";

export interface BookingFormData {
  customer_id: string;
  asset_id: string;
  site_id: number;
  special_requirements?: string;
  total_amount?: number;
}

export interface UseBookingDrawerProps {
  booking?: any;
  onClose: () => void;
  onBookingUpdated: () => void;
}