
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingStatus } from "@/types/booking";
import { QueryOptions, QueryResult, applyQueryOptions, ServiceError } from "./utils/queryUtils";
import { DateRange } from "react-day-picker";

export interface BookingQueryOptions extends QueryOptions {
  status?: BookingStatus | 'all';
  dateRange?: DateRange;
}

class BookingService {
  private tableName = 'bookings';

  async getBookings(options: BookingQueryOptions = {}): Promise<QueryResult<Booking>> {
    try {
      let query = supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customers(*),
          site:sites(*)
        `, { count: 'exact' });

      query = applyQueryOptions(query, options, [
        'customer.first_name',
        'customer.last_name',
        'customer.email'
      ]);

      if (options.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }

      if (options.dateRange?.from && options.dateRange?.to) {
        query = query
          .gte('check_in', options.dateRange.from.toISOString())
          .lte('check_in', options.dateRange.to.toISOString());
      }

      const { data, error, count } = await query;

      if (error) throw new ServiceError('Failed to fetch bookings', error);

      return {
        data: data as Booking[],
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch bookings', error);
    }
  }

  async getBookingById(id: string): Promise<Booking> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customers(*),
          site:sites(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw new ServiceError('Failed to fetch booking', error);
      if (!data) throw new ServiceError('Booking not found');

      return data as Booking;
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch booking', error);
    }
  }
}

export const bookingService = new BookingService();
