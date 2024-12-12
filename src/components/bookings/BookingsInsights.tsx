import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
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
    {
      title: "Total Bookings",
      value: String(insights?.totalBookings || 0),
      icon: Users,
      trend: {
        value: "+12%",
        isPositive: true,
        comparedTo: "last month"
      },
      breakdown: [
        { label: "New", value: "45", percentage: 60 },
        { label: "Returning", value: "30", percentage: 40 }
      ]
    },
    {
      title: "Active Bookings",
      value: String(insights?.activeBookings || 0),
      icon: Clock,
      trend: {
        value: "+5%",
        isPositive: true,
        comparedTo: "last week"
      },
      breakdown: [
        { label: "Long-term", value: "25", percentage: 70 },
        { label: "Short-term", value: "10", percentage: 30 }
      ]
    },
    {
      title: "Today's Check-ins",
      value: String(insights?.todayCheckIns || 0),
      icon: MapPin,
      trend: {
        value: "Same",
        isPositive: true,
        comparedTo: "yesterday"
      },
      breakdown: [
        { label: "Morning", value: "8", percentage: 65 },
        { label: "Afternoon", value: "4", percentage: 35 }
      ]
    },
    {
      title: "Total Revenue",
      value: `$${(insights?.totalRevenue || 0).toLocaleString()}`,
      icon: ChartBar,
      trend: {
        value: "+8%",
        isPositive: true,
        comparedTo: "last month"
      },
      breakdown: [
        { label: "Slip Rental", value: "$45,000", percentage: 75 },
        { label: "Services", value: "$15,000", percentage: 25 }
      ]
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      {stats.map((stat, index) => (
        <EnhancedStatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          trend={stat.trend}
          breakdown={stat.breakdown}
        />
      ))}
    </div>
  );
}