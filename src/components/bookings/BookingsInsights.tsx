import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { ChartBar, Activity, Calendar, LogOut } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { DateRange } from "react-day-picker";
import { format, isWithinInterval } from "date-fns";

interface BookingsInsightsProps {
  dateRange?: DateRange;
}

export function BookingsInsights({ dateRange }: BookingsInsightsProps) {
  const { organizationId, accountId } = useOrganization();
  
  const { data: insights } = useQuery({
    queryKey: ['bookings-insights', organizationId, accountId, dateRange?.from, dateRange?.to],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const today = format(new Date(), 'yyyy-MM-dd');
      
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
        .in('status', ['confirmed', 'checked_in']); // Only active bookings

      // Apply date range filter if provided
      if (dateRange?.from && dateRange?.to) {
        query = query
          .gte('check_in_date', format(dateRange.from, 'yyyy-MM-dd'))
          .lte('check_out_date', format(dateRange.to, 'yyyy-MM-dd'));
      }

      const [bookings, checkIns, checkOuts] = await Promise.all([
        query,
        supabase
          .from('bookings')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .eq('check_in_date', today),
        supabase
          .from('bookings')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .eq('check_out_date', today)
      ]);

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

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <EnhancedStatCard
        title="Active Bookings"
        value={String(insights?.activeBookings || 0)}
        icon={ChartBar}
        trend={{
          value: "+12%",
          isPositive: true,
          comparedTo: "previous period"
        }}
        breakdown={[
          { label: "Short-term", value: "45", percentage: 60 },
          { label: "Long-term", value: "30", percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="RV Types"
        value={String(insights?.rvTypeDistribution?.length || 0)}
        icon={Activity}
        breakdown={insights?.rvTypeDistribution || [
          { label: "Loading...", value: "0", percentage: 0 },
          { label: "Loading...", value: "0", percentage: 0 }
        ]}
      />
      <EnhancedStatCard
        title="Today's Check-ins"
        value={String(insights?.checkIns || 0)}
        icon={Calendar}
        trend={{
          value: "On schedule",
          isPositive: true,
          comparedTo: "today"
        }}
        breakdown={[
          { label: "Morning", value: String(Math.ceil((insights?.checkIns || 0) * 0.6)), percentage: 60 },
          { label: "Afternoon", value: String(Math.floor((insights?.checkIns || 0) * 0.4)), percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="Today's Check-outs"
        value={String(insights?.checkOuts || 0)}
        icon={LogOut}
        trend={{
          value: "On schedule",
          isPositive: true,
          comparedTo: "today"
        }}
        breakdown={[
          { label: "Morning", value: String(Math.ceil((insights?.checkOuts || 0) * 0.7)), percentage: 70 },
          { label: "Afternoon", value: String(Math.floor((insights?.checkOuts || 0) * 0.3)), percentage: 30 }
        ]}
      />
    </div>
  );
}