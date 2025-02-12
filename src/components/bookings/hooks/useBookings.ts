
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

interface UseBookingsOptions {
  page?: number;
  itemsPerPage?: number;
}

export function useBookings({ page = 1, itemsPerPage = 25 }: UseBookingsOptions = {}) {
  const { organizationId, accountId } = useOrganization();

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', organizationId, accountId, page, itemsPerPage],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return { data: [], total: 0 };
      }

      const [countResult, bookingsResult] = await Promise.all([
        // Get total count
        supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('organization_id', organizationId)
          .eq('account_id', accountId),
        
        // Get paginated data
        supabase
          .from('bookings')
          .select(`
            *,
            customer:customers(*),
            asset:assets(*),
            site:sites(*)
          `)
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .order('created_at', { ascending: false })
          .range((page - 1) * itemsPerPage, page * itemsPerPage - 1)
      ]);

      if (countResult.error) {
        toast.error("Failed to fetch bookings count");
        throw countResult.error;
      }

      if (bookingsResult.error) {
        toast.error("Failed to fetch bookings");
        throw bookingsResult.error;
      }

      return {
        data: bookingsResult.data as Booking[],
        total: countResult.count || 0
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
