import { Users, TrendingUp, Activity, Star } from "lucide-react";
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
        return {
          totalCustomers: 1,
          newCustomers: 0,
          engagementRate: 0,
          rating: {
            overall: 4.8,
            service: 4.9,
            communication: 4.7
          }
        };
      }

      const { data: customers, error } = await supabase
        .from('customers')
        .select('id, created_at');

      if (error) throw error;

      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

      const totalCustomers = customers?.length || 0;
      const newCustomers = customers?.filter(c => 
        new Date(c.created_at!) >= lastMonth
      ).length || 0;

      const rating = {
        overall: 4.8,
        service: 4.9,
        communication: 4.7
      };

      return {
        totalCustomers,
        newCustomers,
        engagementRate: 0,
        rating
      };
    }
  });

  if (!customerStats) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Customers"
        value={customerStats.totalCustomers.toString()}
        icon={Users}
        trend={{
          value: "8%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Active", value: `${customerStats.totalCustomers}`, percentage: 100 },
          { label: "Inactive", value: "0", percentage: 0 }
        ]}
      />

      <EnhancedStatCard
        title="New Customers"
        value={customerStats.newCustomers.toString()}
        icon={TrendingUp}
        trend={{
          value: `${customerStats.newCustomers} customers`,
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Website", value: "5", percentage: 63 },
          { label: "Referrals", value: "3", percentage: 37 }
        ]}
      />

      <EnhancedStatCard
        title="Customer Rating"
        value={`${customerStats.rating.overall}/5`}
        icon={Star}
        trend={{
          value: "0.2",
          isPositive: true,
          comparedTo: "last rating"
        }}
        breakdown={[
          { label: "Service", value: `${customerStats.rating.service}/5`, percentage: 95 },
          { label: "Communication", value: `${customerStats.rating.communication}/5`, percentage: 90 }
        ]}
      />

      <EnhancedStatCard
        title="Lifetime Value"
        value={customer?.lifetime_value ? `$${customer.lifetime_value}` : '$0'}
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