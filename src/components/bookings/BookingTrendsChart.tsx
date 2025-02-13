
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

interface BookingTrend {
  month: string;
  short_term_bookings: number;
  long_term_bookings: number;
  cancellations: number;
}

interface BookingTrendsChartProps {
  dateRange?: DateRange;
}

export function BookingTrendsChart({ dateRange }: BookingTrendsChartProps) {
  const { organizationId, accountId } = useOrganization();

  const { data: trends, isLoading, error } = useQuery({
    queryKey: ['booking-trends', organizationId, accountId, dateRange],
    queryFn: async () => {
      let query = supabase
        .from('booking_trends_data')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (dateRange?.from) {
        query = query.gte('month', dateRange.from.toISOString().split('T')[0]);
      }
      if (dateRange?.to) {
        query = query.lte('month', dateRange.to.toISOString().split('T')[0]);
      }

      const { data, error } = await query.order('month', { ascending: true });

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        return [];
      }

      return data.map((trend: BookingTrend) => ({
        ...trend,
        month: format(new Date(trend.month), 'MMM yyyy'),
        short_term_bookings: Number(trend.short_term_bookings) || 0,
        long_term_bookings: Number(trend.long_term_bookings) || 0,
        cancellations: Number(trend.cancellations) || 0
      }));
    },
    enabled: !!organizationId && !!accountId,
  });

  if (isLoading) {
    return (
      <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
        <CardHeader>
          <CardTitle className="text-[#133134] text-xl">Booking Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex items-center justify-center">
            Loading...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
        <CardHeader>
          <CardTitle className="text-[#133134] text-xl">Booking Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex items-center justify-center text-red-500">
            Error loading booking trends data
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!trends || trends.length === 0) {
    return (
      <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
        <CardHeader>
          <CardTitle className="text-[#133134] text-xl">Booking Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full flex items-center justify-center text-gray-500">
            No booking trends data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#133134] text-xl">Booking Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trends} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12, fill: '#133134' }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: '#133134' }}
                label={{ 
                  value: 'Number of Bookings',
                  angle: -90,
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#133134' }
                }}
              />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="short_term_bookings" 
                name="Short Term" 
                fill="#0EA5E9" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="long_term_bookings" 
                name="Long Term" 
                fill="#8B5CF6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="cancellations" 
                name="Cancelled" 
                fill="#F43F5E" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
