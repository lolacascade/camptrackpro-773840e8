import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Users, UserPlus, Activity, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { startOfMonth, subMonths, endOfMonth } from "date-fns";

export function CustomerInsights() {
  // Get current month's customers with proper ISO string formatting
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());
  const lastMonthStart = startOfMonth(subMonths(new Date(), 1));
  const lastMonthEnd = endOfMonth(subMonths(new Date(), 1));
  const threeMonthsAgo = subMonths(new Date(), 3);

  const { data: customerStats } = useQuery({
    queryKey: ['customer-stats'],
    queryFn: async () => {
      console.log('Fetching customer stats...');
      
      // Get current month's total customers
      const { data: currentMonthCustomers, error: currentError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', currentMonthEnd.toISOString());

      if (currentError) {
        console.error('Current month error:', currentError);
        throw currentError;
      }

      // Get last month's total customers
      const { data: lastMonthCustomers, error: lastError } = await supabase
        .from('customers')
        .select('id')
        .lte('created_at', lastMonthEnd.toISOString());

      if (lastError) {
        console.error('Last month error:', lastError);
        throw lastError;
      }

      // Get active customers (created in last 3 months)
      const { data: activeCustomers, error: activeError } = await supabase
        .from('customers')
        .select('id')
        .gte('created_at', threeMonthsAgo.toISOString());

      if (activeError) {
        console.error('Active customers error:', activeError);
        throw activeError;
      }

      console.log('Current month customers:', currentMonthCustomers?.length);
      console.log('Last month customers:', lastMonthCustomers?.length);
      console.log('Active customers:', activeCustomers?.length);

      const currentTotal = currentMonthCustomers?.length || 0;
      const lastTotal = lastMonthCustomers?.length || 0;
      const activeTotal = activeCustomers?.length || 0;
      const inactiveTotal = currentTotal - activeTotal;

      const percentageChange = lastTotal > 0 
        ? ((currentTotal - lastTotal) / lastTotal) * 100 
        : 0;

      return {
        currentTotal,
        lastTotal,
        activeTotal,
        inactiveTotal,
        percentageChange: Math.round(percentageChange * 10) / 10 // Round to 1 decimal
      };
    }
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Customers"
        value={customerStats?.currentTotal.toString() || "0"}
        icon={Users}
        trend={{
          value: `${Math.abs(customerStats?.percentageChange || 0)}%`,
          isPositive: (customerStats?.percentageChange || 0) >= 0,
          comparedTo: "last month"
        }}
        breakdown={[
          { 
            label: "Active", 
            value: customerStats?.activeTotal.toString() || "0", 
            percentage: customerStats?.currentTotal ? Math.round((customerStats.activeTotal / customerStats.currentTotal) * 100) : 0 
          },
          { 
            label: "Inactive", 
            value: customerStats?.inactiveTotal.toString() || "0", 
            percentage: customerStats?.currentTotal ? Math.round((customerStats.inactiveTotal / customerStats.currentTotal) * 100) : 0 
          }
        ]}
      />
      <EnhancedStatCard
        title="New Customers"
        value="8"
        icon={UserPlus}
        trend={{
          value: "2 customers",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Website", value: "5", percentage: 63 },
          { label: "Referrals", value: "3", percentage: 37 }
        ]}
      />
      <EnhancedStatCard
        title="Active Engagement"
        value="78%"
        icon={Activity}
        trend={{
          value: "3%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Bookings", value: "60%", percentage: 60 },
          { label: "Reviews", value: "18%", percentage: 18 }
        ]}
      />
      <EnhancedStatCard
        title="Customer Rating"
        value="4.8/5"
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
    </div>
  );
}