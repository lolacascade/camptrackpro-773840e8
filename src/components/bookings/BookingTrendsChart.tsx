import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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

interface BookingTrend {
  month: string;
  short_term_bookings: number;
  long_term_bookings: number;
  cancellations: number;
}

export function BookingTrendsChart() {
  const { data: trends, isLoading, error } = useQuery({
    queryKey: ['booking-trends'],
    queryFn: async () => {
      console.log('Fetching booking trends data...');
      const { data, error } = await supabase
        .from('booking_trends_data')
        .select('*')
        .order('month', { ascending: true });

      if (error) {
        console.error('Error fetching booking trends:', error);
        throw error;
      }

      console.log('Received booking trends data:', data);
      return data.map((trend: BookingTrend) => ({
        ...trend,
        month: format(new Date(trend.month), 'MMM yyyy')
      }));
    }
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