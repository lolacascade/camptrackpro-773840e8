import { Json } from './common';

export interface BookingTypes {
  Row: {
    id: number;
    customer_id: number;
    check_in_date: string;
    check_out_date: string;
    slot_id: number;
    created_at: string | null;
    special_requirements: string | null;
    status: string;
    reservation_code: string;
  };
  Insert: {
    id?: number;
    customer_id: number;
    check_in_date: string;
    check_out_date: string;
    slot_id: number;
    created_at?: string | null;
    special_requirements?: string | null;
    status?: string;
    reservation_code?: string;
  };
  Update: {
    id?: number;
    customer_id?: number;
    check_in_date?: string;
    check_out_date?: string;
    slot_id?: number;
    created_at?: string | null;
    special_requirements?: string | null;
    status?: string;
    reservation_code?: string;
  };
}