
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking, BookingFilters } from "@/types/booking";
import { useOrganization } from "@/hooks/use-organization";

interface UseBookingsProps {
  filters: BookingFilters;
}

export function useBookings({ filters }: UseBookingsProps) {
  const { organizationId, accountId } = useOrganization();
  const ITEMS_PER_PAGE = 25;

  return useQuery({
    queryKey: ["bookings", organizationId, accountId, filters],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return {
          data: [],
          total: 0
        };
      }

      let query = supabase
        .from("bookings")
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
          )
        `, { count: 'exact' })
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (filters.searchTerm) {
        query = query.or(`customer.first_name.ilike.%${filters.searchTerm}%,customer.last_name.ilike.%${filters.searchTerm}%`);
      }

      if (filters.status !== 'all') {
        query = query.eq('status', filters.status);
      }

      if (filters.dateRange?.from && filters.dateRange?.to) {
        query = query
          .gte('check_in', filters.dateRange.from.toISOString())
          .lte('check_out', filters.dateRange.to.toISOString());
      }

      const start = (filters.page - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE - 1;
      query = query.range(start, end);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      return {
        data: data as Booking[],
        total: count || 0
      };
    },
    enabled: !!organizationId && !!accountId
  });
}
