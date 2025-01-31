import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";

interface BookingInsight {
  activeBookings: number;
  rvTypeDistribution: {
    label: string;
    value: string;
    percentage: number;
  }[];
  checkIns: number;
  checkOuts: number;
}

export function useBookingsInsights(dateRange?: DateRange) {
  const { organizationId, accountId } = useOrganization();
  
  return useQuery({
    queryKey: ['bookings-insights', organizationId, accountId, dateRange?.from, dateRange?.to],
    queryFn: async (): Promise<BookingInsight> => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      // Base query for active bookings within date range
      let query = supabase
        .from('bookings')
        .select(`
          *,
          asset:assets(
            asset_type
          )
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .in('status', ['pending', 'confirmed', 'checked_in']);

      // Apply date range filter to all queries
      const startDate = dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');
      const endDate = dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd');

      query = query
        .or(`check_in_date.gte.${startDate},check_out_date.lte.${endDate}`);

      const [bookings, checkIns, checkOuts] = await Promise.all([
        query,
        supabase
          .from('bookings')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .in('status', ['pending', 'confirmed'])
          .gte('check_in_date', startDate)
          .lte('check_in_date', endDate),
        supabase
          .from('bookings')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .in('status', ['checked_in', 'confirmed'])
          .gte('check_out_date', startDate)
          .lte('check_out_date', endDate)
      ]);

      if (bookings.error) throw bookings.error;
      if (checkIns.error) throw checkIns.error;
      if (checkOuts.error) throw checkOuts.error;

      // Calculate RV type distribution
      const rvTypeDistribution = bookings.data?.reduce((acc: Record<string, number>, booking) => {
        const rvType = booking.asset?.asset_type || 'Unknown';
        acc[rvType] = (acc[rvType] || 0) + 1;
        return acc;
      }, {});

      // Get the top 2 RV types for the breakdown
      const topRvTypes = Object.entries(rvTypeDistribution || {})
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([type, count]) => ({
          label: type,
          value: String(count),
          percentage: Math.round((count / (bookings.data?.length || 1)) * 100)
        }));

      return {
        activeBookings: bookings.data?.length || 0,
        rvTypeDistribution: topRvTypes,
        checkIns: checkIns.data?.length || 0,
        checkOuts: checkOuts.data?.length || 0
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}