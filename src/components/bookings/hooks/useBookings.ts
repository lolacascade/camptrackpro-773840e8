
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingFilters } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";
import { format } from "date-fns";

interface UseBookingsOptions {
  filters: BookingFilters;
}

export function useBookings({ filters }: UseBookingsOptions) {
  const { organizationId, accountId } = useOrganization();
  const ITEMS_PER_PAGE = 25;

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', organizationId, accountId, filters],
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
      if (filters.dateRange?.from && filters.dateRange?.to) {
        query = query
          .gte('check_in_date', format(filters.dateRange.from, 'yyyy-MM-dd'))
          .lte('check_in_date', format(filters.dateRange.to, 'yyyy-MM-dd'));
      }

      // Apply status filter if not "all"
      if (filters.status !== "all") {
        query = query.eq('status', filters.status);
      }

      // Apply search filter if provided
      if (filters.searchTerm) {
        query = query.or(`
          customer.first_name.ilike.%${filters.searchTerm}%,
          customer.last_name.ilike.%${filters.searchTerm}%,
          customer.email.ilike.%${filters.searchTerm}%
        `);
      }

      // Apply pagination
      const start = (filters.page - 1) * ITEMS_PER_PAGE;
      query = query
        .order('created_at', { ascending: false })
        .range(start, start + ITEMS_PER_PAGE - 1);

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
