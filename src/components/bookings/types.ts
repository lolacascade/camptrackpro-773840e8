import { DateRange } from "react-day-picker";

export interface BookingFormData {
  customer_id: string;
  asset_id: string;
  site_id: number;
  special_requirements?: string;
}

export interface UseBookingDrawerProps {
  booking?: any;
  onClose: () => void;
  onBookingUpdated: () => void;
}

export interface BookingDrawerProps extends UseBookingDrawerProps {
  open: boolean;
}