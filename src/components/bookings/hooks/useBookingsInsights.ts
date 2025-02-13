
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { BookingInsight } from "../insights/types";

export function useBookingsInsights(dateRange?: DateRange) {
  const { organizationId, accountId } = useOrganization();
  
  return useQuery({
    queryKey: ['bookings-insights', organizationId, accountId, dateRange?.from, dateRange?.to],
    queryFn: async (): Promise<BookingInsight> => {
      if (!organizationId || !accountId) {
        throw new Error("Organization or account context not found");
      }

      const { data, error } = await supabase.rpc('get_enhanced_booking_stats', {
        org_id: organizationId,
        acc_id: accountId,
        start_date: dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : null,
        end_date: dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : null
      });

      if (error) {
        console.error('Error fetching booking stats:', error);
        throw error;
      }

      return {
        activeBookings: Number(data[0].active_bookings) || 0,
        quarterlyGrowth: Number(data[0].quarterly_growth) || 0,
        yoyComparison: Number(data[0].yoy_comparison) || 0,
        avgTenancyDays: Number(data[0].avg_tenancy_days) || 0,
        minTenancyDays: Number(data[0].min_tenancy_days) || 0,
        maxTenancyDays: Number(data[0].max_tenancy_days) || 0,
        todayCheckIns: Number(data[0].todays_checkins) || 0,
        monthlyCheckIns: Number(data[0].monthly_checkins) || 0,
        periodCheckIns: Number(data[0].period_checkins) || 0,
        todayCheckOuts: Number(data[0].todays_checkouts) || 0,
        monthlyCheckOuts: Number(data[0].monthly_checkouts) || 0,
        periodCheckOuts: Number(data[0].period_checkouts) || 0
      };
    },
    enabled: !!organizationId && !!accountId,
  });
}
