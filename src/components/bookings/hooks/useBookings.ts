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
        console.log('No organization or account context found:', { organizationId, accountId });
        return [];
      }

      console.log('Fetching bookings with:', { organizationId, accountId });

      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(*),
          asset:assets(*)
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error("Failed to fetch bookings");
        throw error;
      }

      console.log('Bookings data received:', data);
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