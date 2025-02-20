
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingStatus } from "@/types/booking";

export async function createBooking(bookingData: Partial<Booking>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([bookingData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateBooking(id: string, bookingData: Partial<Booking>) {
  const { data, error } = await supabase
    .from('bookings')
    .update(bookingData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getBookingsByOrganization(organizationId: string, accountId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select(`
      *,
      customer:customers(id, first_name, last_name),
      site:sites(id, name),
      rv:rvs(id, make, model, year)
    `)
    .eq('organization_id', organizationId)
    .eq('account_id', accountId);

  if (error) throw error;
  return data;
}
