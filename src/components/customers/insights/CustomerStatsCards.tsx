import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { BookingsStatCard } from "./stats/BookingsStatCard";
import { AssetsStatCard } from "./stats/AssetsStatCard";
import { RatingStatCard } from "./stats/RatingStatCard";
import { LifetimeValueStatCard } from "./stats/LifetimeValueStatCard";

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
      <BookingsStatCard 
        customer={customer}
        totalBookings={customerStats.totalBookings?.toString() || "0"}
        activeBookings={customerStats.activeBookings?.toString() || "0"}
        totalCustomers={customerStats.totalCustomers?.toString() || "0"}
      />
      <AssetsStatCard 
        customer={customer}
        totalAssets={customerStats.totalAssets?.toString() || "0"}
        newCustomers={customerStats.newCustomers?.toString() || "0"}
      />
      <RatingStatCard rating={customerStats.rating} />
      <LifetimeValueStatCard value={customerStats.lifetimeValue} />
    </div>
  );
}