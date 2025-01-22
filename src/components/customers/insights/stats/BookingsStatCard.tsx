import { Users } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Customer } from "@/types/customer";

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
          value: String(customer ? activeBookings : 45), 
          percentage: 60 
        },
        { 
          label: "Completed", 
          value: String(customer ? (Number(totalBookings) - Number(activeBookings)) : 30), 
          percentage: 40 
        }
      ]}
    />
  );
}