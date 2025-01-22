import { Users, TrendingUp, Star, Activity } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";

interface CustomerStatsCardsProps {
  customer?: Customer;
}

export function CustomerStatsCards({ customer }: CustomerStatsCardsProps) {
  const { data: customerStats } = useQuery({
    queryKey: ['customer-stats', customer?.id],
    queryFn: async () => {
      if (customer) {
        // Single customer view stats
        const { data: bookings } = await supabase
          .from('bookings')
          .select('*')
          .eq('customer_id', customer.id);

        const { data: assets } = await supabase
          .from('assets')
          .select('*')
          .eq('customer_id', customer.id);

        return {
          totalBookings: bookings?.length || 0,
          activeBookings: bookings?.filter(b => b.status === 'confirmed').length || 0,
          totalAssets: assets?.length || 0,
          rating: 4.8,
          lifetimeValue: customer.lifetime_value || 0
        };
      }

      // Overview stats for all customers
      const { data: customers } = await supabase
        .from('customers')
        .select('id, created_at');

      const totalCustomers = customers?.length || 0;
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const newCustomers = customers?.filter(c => 
        new Date(c.created_at) >= lastMonth
      ).length || 0;

      return {
        totalCustomers,
        newCustomers,
        rating: 4.8,
        lifetimeValue: 0
      };
    },
    enabled: true
  });

  if (!customerStats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Bookings"
        value={customer ? String(customerStats.totalBookings) : String(customerStats.totalCustomers)}
        icon={Users}
        trend={{
          value: "+12%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Active", value: String(customer ? customerStats.activeBookings : 45), percentage: 60 },
          { label: "Completed", value: String(customer ? (customerStats.totalBookings - customerStats.activeBookings) : 30), percentage: 40 }
        ]}
      />

      <EnhancedStatCard
        title={customer ? "Assets" : "New Customers"}
        value={String(customer ? customerStats.totalAssets : customerStats.newCustomers)}
        icon={TrendingUp}
        trend={{
          value: customer ? "2 assets" : `${customerStats.newCustomers} customers`,
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Active", value: String(customer ? customerStats.totalAssets : 5), percentage: 63 },
          { label: "Inactive", value: "0", percentage: 37 }
        ]}
      />

      <EnhancedStatCard
        title="Customer Rating"
        value={`${customerStats.rating}/5`}
        icon={Star}
        trend={{
          value: "0.2",
          isPositive: true,
          comparedTo: "last rating"
        }}
        breakdown={[
          { label: "Service", value: "4.9/5", percentage: 95 },
          { label: "Communication", value: "4.7/5", percentage: 90 }
        ]}
      />

      <EnhancedStatCard
        title="Lifetime Value"
        value={`$${customerStats.lifetimeValue}`}
        icon={Activity}
        trend={{
          value: "3%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Services", value: "60%", percentage: 60 },
          { label: "Products", value: "40%", percentage: 40 }
        ]}
      />
    </div>
  );
}