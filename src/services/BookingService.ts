
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingStatus } from "@/types/booking";
import { QueryOptions, QueryResult, applyQueryOptions } from "./utils/queryUtils";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

export interface BookingQueryOptions extends QueryOptions {
  status?: BookingStatus | 'all';
  dateRange?: DateRange;
  organizationId?: string;
  accountId?: string;
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

      // Apply filters
      if (options.organizationId) {
        query = query.eq('organization_id', options.organizationId);
      }
      if (options.accountId) {
        query = query.eq('account_id', options.accountId);
      }
      if (options.status && options.status !== 'all') {
        query = query.eq('status', options.status);
      }
      if (options.dateRange?.from && options.dateRange?.to) {
        query = query
          .gte('check_in', options.dateRange.from.toISOString())
          .lte('check_in', options.dateRange.to.toISOString());
      }

      query = applyQueryOptions(query, options);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to fetch bookings');
        throw error;
      }

      return {
        data: data || [],
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      console.error('Error in getBookings:', error);
      throw error;
    }
  }

  async getBookingById(id: string): Promise<Booking | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        customer:customers(*),
        site:sites(*)
      `)
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching booking:', error);
      toast.error('Failed to fetch booking');
      throw error;
    }

    return data;
  }
}

export const bookingService = new BookingService();
