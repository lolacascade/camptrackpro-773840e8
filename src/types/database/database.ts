import { BookingTypes } from './booking-types';
import { CustomerTypes } from './customer-types';
import { SlotTypes } from './slot-types';
import { MaintenanceTypes } from './maintenance-types';

export interface Database {
  public: {
    Tables: {
      bookings: BookingTypes;
      customers: CustomerTypes;
      slots: SlotTypes;
      maintenance_requests: MaintenanceTypes;
    };
    Views: {
      customer_insights: {
        Row: {
          customer_id: number | null;
          name: string | null;
          email: string | null;
          lifetime_value: number | null;
        };
      };
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}