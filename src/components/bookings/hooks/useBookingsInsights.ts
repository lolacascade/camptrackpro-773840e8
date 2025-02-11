
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

      // Get booking stats using our new secure function
      const { data: stats, error: statsError } = await supabase
        .rpc('get_booking_stats', {
          org_id: organizationId,
          acc_id: accountId
        });

      if (statsError) throw statsError;

      // Filter stats based on date range if provided
      const filteredStats = stats.filter(stat => {
        if (!dateRange?.from || !dateRange?.to) return true;
        const statDate = new Date(stat.check_in_date);
        return statDate >= dateRange.from && statDate <= dateRange.to;
      });

      // Get RV type distribution
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
        ).data?.map(b => b.asset_id) || []);

      if (rvError) throw rvError;

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

      // Calculate totals from filtered stats
      const totals = filteredStats.reduce(
        (acc, stat) => ({
          activeBookings: acc.activeBookings + Number(stat.active_bookings),
          checkIns: acc.checkIns + Number(stat.check_ins),
          checkOuts: acc.checkOuts + Number(stat.completed_bookings)
        }),
        { activeBookings: 0, checkIns: 0, checkOuts: 0 }
      );

      return {
        activeBookings: totals.activeBookings,
        rvTypeDistribution: rvDistribution,
        checkIns: totals.checkIns,
        checkOuts: totals.checkOuts
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}
