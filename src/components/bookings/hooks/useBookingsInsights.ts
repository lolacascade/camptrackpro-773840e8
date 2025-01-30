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
      console.log('Fetching insights with:', {
        organizationId,
        accountId,
        dateRange
      });

      if (!organizationId || !accountId) {
        console.error("Organization or account context not found");
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

      // Apply date range filter
      if (dateRange?.from && dateRange?.to) {
        console.log('Applying date range filter:', {
          from: format(dateRange.from, 'yyyy-MM-dd'),
          to: format(dateRange.to, 'yyyy-MM-dd')
        });
        
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
          .in('status', ['pending', 'confirmed'])
          .gte('check_in_date', dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))
          .lte('check_in_date', dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')),
        supabase
          .from('bookings')
          .select('*')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .in('status', ['checked_in', 'confirmed'])
          .gte('check_out_date', dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))
          .lte('check_out_date', dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))
      ]);

      console.log('Query results:', {
        bookings: bookings.data,
        checkIns: checkIns.data,
        checkOuts: checkOuts.data
      });

      if (bookings.error) {
        console.error('Error fetching bookings:', bookings.error);
        throw bookings.error;
      }
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