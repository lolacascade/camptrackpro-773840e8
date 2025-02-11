
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

      console.log('Fetching booking stats for date range:', dateRange);

      // Get booking stats using our new period-based function
      const { data: stats, error: statsError } = await supabase
        .rpc('get_booking_stats_by_period', {
          org_id: organizationId,
          acc_id: accountId,
          start_date: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : null,
          end_date: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : null
        });

      if (statsError) {
        console.error('Error fetching booking stats:', statsError);
        throw statsError;
      }

      console.log('Received booking stats:', stats);

      // Get RV type distribution for the selected date range
      const { data: rvTypes, error: rvError } = await supabase
        .from('assets')
        .select('asset_type')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId)
        .in('id', (await supabase
          .from('bookings')
          .select('asset_id')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .in('status', ['confirmed', 'checked_in'])
          .gte('check_in_date', dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '1970-01-01')
          .lte('check_in_date', dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '2100-12-31')
        ).data?.map(b => b.asset_id) || []);

      if (rvError) {
        console.error('Error fetching RV types:', rvError);
        throw rvError;
      }

      console.log('Received RV types:', rvTypes);

      // Calculate RV type distribution
      const rvCounts: Record<string, number> = {};
      rvTypes.forEach(({ asset_type }) => {
        if (asset_type) {
          rvCounts[asset_type] = (rvCounts[asset_type] || 0) + 1;
        }
      });

      const totalRvs = Object.values(rvCounts).reduce((sum, count) => sum + count, 0);
      const rvDistribution = Object.entries(rvCounts)
        .map(([type, count]) => ({
          label: type,
          value: String(count),
          percentage: Math.round((count / totalRvs) * 100)
        }))
        .sort((a, b) => Number(b.value) - Number(a.value))
        .slice(0, 2);

      // Since our new function returns a single row with period totals
      const periodStats = stats[0] || {
        active_bookings: 0,
        check_ins: 0,
        completed_bookings: 0,
        cancelled_bookings: 0
      };

      return {
        activeBookings: Number(periodStats.active_bookings || 0),
        rvTypeDistribution: rvDistribution,
        checkIns: Number(periodStats.check_ins || 0),
        checkOuts: Number(periodStats.completed_bookings || 0)
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}
