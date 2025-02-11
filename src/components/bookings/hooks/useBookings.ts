
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

export function useBookings() {
  const { organizationId, accountId } = useOrganization();

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ['bookings', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return [];
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          asset:assets(*)
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .order('created_at', { ascending: false });

      if (error) {
        toast.error("Failed to fetch bookings");
        throw error;
      }

      return data as Booking[];
    },
    enabled: !!organizationId && !!accountId
  });

  return {
    bookings,
    isLoading,
    error
  };
}
