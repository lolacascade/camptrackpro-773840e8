import { Users } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Customer } from "@/types/customer";
import { toStringSafe } from "@/lib/typeUtils";

interface BookingsStatCardProps {
  customer?: Customer;
  totalBookings: string;
  activeBookings: string;
  totalCustomers: string;
}

export function BookingsStatCard({ 
  customer, 
  totalBookings, 
  activeBookings,
  totalCustomers 
}: BookingsStatCardProps) {
  return (
    <EnhancedStatCard
      title="Total Bookings"
      value={customer ? totalBookings : totalCustomers}
      icon={Users}
      trend={{
        value: "+12%",
        isPositive: true,
        comparedTo: "last month"
      }}
      breakdown={[
        { 
          label: "Active", 
          value: activeBookings, 
          percentage: 60 
        },
        { 
          label: "Completed", 
          value: toStringSafe(customer ? 
            (Number(totalBookings) - Number(activeBookings)) : 
            30
          ), 
          percentage: 40 
        }
      ]}
    />
  );
}