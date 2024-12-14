import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Users, UserPlus, Activity, Star } from "lucide-react";

export function CustomerInsights() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Customers"
        value="152"
        icon={Users}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Active", value: "140", percentage: 92 },
          { label: "Inactive", value: "12", percentage: 8 }
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