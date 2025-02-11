
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Booking } from "@/types/booking";
import { toast } from "sonner";
import { useOrganization } from "@/hooks/use-organization";

export function useBooking(id?: string) {
  const { organizationId, accountId } = useOrganization();

  const { data: booking, isLoading, error } = useQuery({
    queryKey: ['booking', id, organizationId, accountId],
    queryFn: async () => {
      if (!id || !organizationId || !accountId) {
        return null;
      }

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          asset:assets(*)
        `)
        .eq('id', id)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .single();

      if (error) {
        toast.error("Failed to fetch booking");
        throw error;
      }

      return data as Booking;
    },
    enabled: !!id && !!organizationId && !!accountId
  });

  return {
    booking,
    isLoading,
    error
  };
}
