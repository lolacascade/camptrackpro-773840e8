import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { BookingInsight } from "./types";

export function useBookingInsights() {
  const { organizationId, accountId } = useOrganization();
  
  return useQuery({
    queryKey: ['bookings-insights', organizationId, accountId],
    queryFn: async (): Promise<BookingInsight> => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const today = new Date().toISOString().split('T')[0];
      const [totalBookings, activeBookings, todayCheckIns, revenue] = await Promise.all([
        supabase.from('bookings')
          .select('*', { count: 'exact' })
          .eq('organization_id', organizationId)
          .eq('account_id', accountId),
        supabase.from('bookings')
          .select('*', { count: 'exact' })
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .gte('check_out_date', today),
        supabase.from('bookings')
          .select('*', { count: 'exact' })
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .eq('check_in_date', today),
        supabase.from('invoices')
          .select('amount')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .eq('status', 'paid')
      ]);

      const totalRevenue = revenue.data?.reduce((sum, invoice) => sum + (invoice.amount || 0), 0) || 0;

      return {
        totalBookings: totalBookings.count || 0,
        activeBookings: activeBookings.count || 0,
        todayCheckIns: todayCheckIns.count || 0,
        totalRevenue
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}