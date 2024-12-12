import { StatCard } from "@/components/dashboard/StatCard";
import { ChartBar, Clock, MapPin, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

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
    { title: "Total Bookings", value: String(insights?.totalBookings || 0), icon: Users },
    { title: "Active Bookings", value: String(insights?.activeBookings || 0), icon: Clock },
    { title: "Today's Check-ins", value: String(insights?.todayCheckIns || 0), icon: MapPin },
    { title: "Total Revenue", value: `$${(insights?.totalRevenue || 0).toLocaleString()}`, icon: ChartBar },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          description=""
          icon={stat.icon}
          trend="up"
          trendValue=""
        />
      ))}
    </div>
  );
}