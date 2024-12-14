import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Users, UserPlus, Activity, Star } from "lucide-react";

interface CustomerStats {
  currentTotal: number;
  lastTotal: number;
  activeTotal: number;
  inactiveTotal: number;
  percentageChange: number;
}

interface CustomerStatsCardsProps {
  customerStats?: CustomerStats;
}

export function CustomerStatsCards({ customerStats }: CustomerStatsCardsProps) {
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