
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

export function useBookings(page = 1, itemsPerPage = 25) {
  const { organizationId, accountId } = useOrganization();

  const { data, isLoading, error } = useQuery({
    queryKey: ['bookings', organizationId, accountId, page, itemsPerPage],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return { data: [], total: 0 };
      }

      // First, get total count
      const { count, error: countError } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (countError) {
        toast.error("Failed to fetch bookings count");
        throw countError;
      }

      // Then get paginated data
      const { data, error } = await supabase
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
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

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
