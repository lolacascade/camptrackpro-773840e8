import { Users } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Customer } from "@/types/customer";

interface BookingsStatCardProps {
  customer?: Customer;
  totalBookings?: number;
  activeBookings?: number;
  totalCustomers?: number;
}

export function BookingsStatCard({ 
  customer, 
  totalBookings = 0, 
  activeBookings = 0,
  totalCustomers = 0 
}: BookingsStatCardProps) {
  return (
    <EnhancedStatCard
      title="Total Bookings"
      value={String(customer ? totalBookings : totalCustomers)}
      icon={Users}
      trend={{
        value: "+12%",
        isPositive: true,
        comparedTo: "last month"
      }}
      breakdown={[
        { 
          label: "Active", 
          value: String(customer ? activeBookings : 45), 
          percentage: 60 
        },
        { 
          label: "Completed", 
          value: String(customer ? (totalBookings - activeBookings) : 30), 
          percentage: 40 
        }
      ]}
    />
  );
}