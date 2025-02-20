
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingStatus } from "@/types/booking";
import { DateRange } from "react-day-picker";

interface GetBookingsOptions {
  organizationId: string;
  accountId: string;
  status?: BookingStatus | 'all';
  searchTerm?: string;
  dateRange?: DateRange | null;
}

export async function getBookings({
  organizationId,
  accountId,
  status = 'all',
  searchTerm = '',
  dateRange
}: GetBookingsOptions): Promise<Booking[]> {
  let query = supabase
    .from('bookings')
    .select(`
      *,
      customer:customers(
        id,
        first_name,
        last_name,
        email
      ),
      site:sites(
        id,
        name,
        location
      ),
      rv:rvs(
        id,
        make,
        model,
        year
      )
    `)
    .eq('organization_id', organizationId)
    .eq('account_id', accountId);

  if (status !== 'all') {
    query = query.eq('status', status);
  }

  if (searchTerm) {
    query = query.or(`customer.first_name.ilike.%${searchTerm}%,customer.last_name.ilike.%${searchTerm}%`);
  }

  if (dateRange?.from && dateRange?.to) {
    query = query
      .gte('check_in', dateRange.from.toISOString())
      .lte('check_out', dateRange.to.toISOString());
  }

  const { data, error } = await query;

  if (error) throw error;
  return data as unknown as Booking[];
}

export async function updateBookingStatus(
  bookingId: string,
  status: BookingStatus,
  organizationId: string,
  accountId: string
): Promise<void> {
  const { error } = await supabase
    .from('bookings')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', bookingId)
    .eq('organization_id', organizationId)
    .eq('account_id', accountId);

  if (error) throw error;
}
