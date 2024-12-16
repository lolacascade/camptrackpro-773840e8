import { Users, TrendingUp, Activity, Star } from "lucide-react";
import { StatsCard } from "@/components/common/StatsCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function CustomerStatsCards() {
  const { data: customerStats } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      const { data: customers, error } = await supabase
        .from('customers')
        .select(`
          id,
          created_at,
          bookings (
            id,
            created_at
          )
        `);

      if (error) throw error;

      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const totalCustomers = customers?.length || 0;
      const newCustomers = customers?.filter(c => 
        new Date(c.created_at!) >= lastMonth
      ).length || 0;

      // Calculate engagement (customers with bookings / total customers)
      const customersWithBookings = customers?.filter(c => 
        c.bookings && c.bookings.length > 0
      ).length || 0;
      const engagementRate = totalCustomers > 0 
        ? Math.round((customersWithBookings / totalCustomers) * 100) 
        : 0;

      // For this example, we'll use static rating data
      // In a real app, this would come from a ratings table
      const rating = {
        overall: 4.8,
        service: 4.9,
        communication: 4.7
      };

      return {
        totalCustomers,
        newCustomers,
        engagementRate,
        rating
      };
    }
  });

  if (!customerStats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Customers"
        value={customerStats.totalCustomers.toString()}
        icon={Users}
        trend={{
          value: "0%",
          isPositive: true,
          comparedTo: "compared to last month"
        }}
        breakdown={[
          { label: "Active", value: `${customerStats.totalCustomers} (100%)`, percentage: 100 },
          { label: "Inactive", value: "00", percentage: 0 }
        ]}
      />

      <StatsCard
        title="New Customers"
        value={customerStats.newCustomers.toString()}
        icon={TrendingUp}
        trend={{
          value: `${customerStats.newCustomers} customers`,
          isPositive: true,
          comparedTo: "compared to last month"
        }}
        breakdown={[
          { label: "Website", value: "5", percentage: 63 },
          { label: "Referrals", value: "3", percentage: 37 }
        ]}
      />

      <StatsCard
        title="Active Engagement"
        value={`${customerStats.engagementRate}%`}
        icon={Activity}
        trend={{
          value: "3%",
          isPositive: true,
          comparedTo: "compared to last month"
        }}
        breakdown={[
          { label: "Bookings", value: "60%", percentage: 60 },
          { label: "Reviews", value: "18%", percentage: 18 }
        ]}
      />

      <StatsCard
        title="Customer Rating"
        value={`${customerStats.rating.overall}/5`}
        icon={Star}
        trend={{
          value: "0.2",
          isPositive: true,
          comparedTo: "compared to last rating"
        }}
        breakdown={[
          { label: "Service", value: `${customerStats.rating.service}/5`, percentage: 95 },
          { label: "Communication", value: `${customerStats.rating.communication}/5`, percentage: 90 }
        ]}
      />
    </div>
  );
}