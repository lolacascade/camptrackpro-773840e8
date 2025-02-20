
import { FilteringService, FilterOptions } from "./base/FilteringService";
import { Booking } from "@/types/booking";
import { DateRange } from "react-day-picker";

interface BookingFilterOptions extends FilterOptions {
  status?: string;
  dateRange?: DateRange;
}

export class BookingService extends FilteringService {
  constructor() {
    super('bookings');
  }

  async getBookings(options: BookingFilterOptions = {}) {
    const {
      searchTerm,
      page,
      pageSize = 25,
      sortBy = 'created_at',
      sortDirection = 'desc',
      status,
      dateRange
    } = options;

    let query = this.getBaseQuery()
      .select(`
        *,
        customer:customers(*),
        site:sites(*)
      `);

    if (status && status !== 'all') {
      query = query.eq('status', status);
    }

    if (dateRange?.from && dateRange?.to) {
      query = query
        .gte('check_in', dateRange.from.toISOString())
        .lte('check_in', dateRange.to.toISOString());
    }

    if (searchTerm) {
      query = query.or(`
        customer.first_name.ilike.%${searchTerm}%,
        customer.last_name.ilike.%${searchTerm}%,
        customer.email.ilike.%${searchTerm}%
      `);
    }

    query = this.applySorting(query, sortBy, sortDirection);
    query = this.applyPagination(query, page, pageSize);

    const { data, error, count } = await query.select('*', { count: 'exact' });

    if (error) {
      throw error;
    }

    return {
      data: data as Booking[],
      total: count || 0,
      page,
      pageSize
    };
  }

  async getBookingById(id: string) {
    const { data, error } = await this.getBaseQuery()
      .select(`
        *,
        customer:customers(*),
        site:sites(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Booking;
  }
}

export const bookingService = new BookingService();
