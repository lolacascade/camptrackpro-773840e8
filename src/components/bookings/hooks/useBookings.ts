
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingStatus } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface UseBookingsOptions {
  page?: number;
  itemsPerPage?: number;
  searchTerm?: string;
  status?: BookingStatus | 'all';
  dateRange?: DateRange;
}

export function useBookings({ 
  page = 1, 
  itemsPerPage = 25,
  searchTerm = "",
  status = "all",
  dateRange
}: UseBookingsOptions = {}) {
  const { organizationId, accountId } = useOrganization();

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', organizationId, accountId, page, itemsPerPage, searchTerm, status, dateRange?.from, dateRange?.to],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return { data: [], total: 0 };
      }

      let query = supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          asset:assets(*),
          site:sites(*)
        `, { count: 'exact' })
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      // Apply date range filter if provided
      if (dateRange?.from && dateRange?.to) {
        query = query
          .gte('check_in_date', format(dateRange.from, 'yyyy-MM-dd'))
          .lte('check_in_date', format(dateRange.to, 'yyyy-MM-dd'));
      }

      // Apply status filter if not "all"
      if (status !== "all") {
        query = query.eq('status', status as BookingStatus);
      }

      // Apply search filter if provided
      if (searchTerm) {
        query = query.or(`
          customer.first_name.ilike.%${searchTerm}%,
          customer.last_name.ilike.%${searchTerm}%,
          customer.email.ilike.%${searchTerm}%
        `);
      }

      // Apply pagination
      query = query
        .order('created_at', { ascending: false })
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      const { data, error, count } = await query;

      if (error) {
        toast.error("Failed to fetch bookings");
        throw error;
      }

      return {
        data: data as Booking[],
        total: count || 0
      };
    },
    enabled: !!organizationId && !!accountId
  });

  return {
    bookings: data?.data || [],
    total: data?.total || 0,
    isLoading,
    error
  };
}
