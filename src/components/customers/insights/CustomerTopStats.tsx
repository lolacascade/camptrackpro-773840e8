import { Users, DollarSign, CalendarDays, Star } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Customer } from "@/types/customer";
import { useCustomerStats } from "@/hooks/customers/useCustomerStats";

interface CustomerTopStatsProps {
  customer: Customer;
}

export function CustomerTopStats({ customer }: CustomerTopStatsProps) {
  const { data: stats } = useCustomerStats(customer?.id);
  const totalBookings = stats?.totalBookings || 0;
  const activeBookings = stats?.activeBookings || 0;
  const lifetimeValue = customer.lifetime_value ? parseFloat(customer.lifetime_value) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <EnhancedStatCard
        title="Total Bookings"
        value={String(totalBookings)}
        icon={Users}
        trend={{
          value: String(activeBookings),
          isPositive: true,
          comparedTo: "active bookings"
        }}
        breakdown={[
          { label: "Active", value: String(activeBookings), percentage: 60 },
          { label: "Completed", value: String(totalBookings - activeBookings), percentage: 40 }
        ]}
      />

      <EnhancedStatCard
        title="Total Spent"
        value={`$${lifetimeValue.toFixed(2)}`}
        icon={DollarSign}
        trend={{
          value: "+12%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "RV Rentals", value: "70%", percentage: 70 },
          { label: "Services", value: "30%", percentage: 30 }
        ]}
      />

      <EnhancedStatCard
        title="Average Stay"
        value="5 days"
        icon={CalendarDays}
        trend={{
          value: "1 day",
          isPositive: true,
          comparedTo: "last visit"
        }}
        breakdown={[
          { label: "Weekday", value: "3 days", percentage: 60 },
          { label: "Weekend", value: "2 days", percentage: 40 }
        ]}
      />

      <EnhancedStatCard
        title="Customer Rating"
        value="4.8/5"
        icon={Star}
        trend={{
          value: "+0.2",
          isPositive: true,
          comparedTo: "previous rating"
        }}
        breakdown={[
          { label: "Service", value: "4.9/5", percentage: 98 },
          { label: "Cleanliness", value: "4.7/5", percentage: 94 }
        ]}
      />
    </div>
  );
}