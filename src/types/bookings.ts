export * from './database/booking';

// Additional booking-related types that aren't directly tied to the database
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