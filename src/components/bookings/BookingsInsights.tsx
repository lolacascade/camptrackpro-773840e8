import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BookingsInsights() {
  const { data: insights } = useQuery({
    queryKey: ['bookings-insights'],
    queryFn: async () => {
      const today = new Date().toISOString().split('T')[0];
      const [totalBookings, activeBookings, todayCheckIns, revenue] = await Promise.all([
        supabase.from('bookings').select('*', { count: 'exact' }),
        supabase.from('bookings')
          .select('*', { count: 'exact' })
          .gte('check_out_date', today),
        supabase.from('bookings')
          .select('*', { count: 'exact' })
          .eq('check_in_date', today),
        supabase.from('invoices')
          .select('amount')
          .eq('status', 'paid')
      ]);

      const totalRevenue = revenue.data?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

      return {
        totalBookings: totalBookings.count || 0,
        activeBookings: activeBookings.count || 0,
        todayCheckIns: todayCheckIns.count || 0,
        totalRevenue
      };
    },
  });

  const stats = [
    { title: "Total Bookings", value: insights?.totalBookings || 0 },
    { title: "Active Bookings", value: insights?.activeBookings || 0 },
    { title: "Today's Check-ins", value: insights?.todayCheckIns || 0 },
    { title: "Total Revenue", value: `$${(insights?.totalRevenue || 0).toLocaleString()}` },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="border border-[#E8EBEB] rounded-xl bg-transparent">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-[#3E4238]">
              {stat.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#133134]">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}