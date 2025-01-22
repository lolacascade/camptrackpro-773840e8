import { Customer } from "@/types/customer";
import { CustomerStatsCards } from "./insights/CustomerStatsCards";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Users, DollarSign, CalendarDays, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface CustomerInsightsProps {
  customer: Customer | null;
}

export function CustomerInsights({ customer }: CustomerInsightsProps) {
  const { data: customerStats } = useQuery({
    queryKey: ['customer-stats', customer?.id],
    queryFn: async () => {
      if (!customer?.id) return null;

      // Get bookings count
      const { data: bookings } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', customer.id);

      // Get total spent
      const totalSpent = bookings?.reduce((acc, booking) => acc + Number(booking.total_amount), 0) || 0;

      return {
        totalBookings: bookings?.length || 0,
        activeBookings: bookings?.filter(b => b.status === 'confirmed' || b.status === 'checked_in').length || 0,
        totalSpent,
        avgBookingValue: bookings?.length ? totalSpent / bookings.length : 0
      };
    },
    enabled: !!customer?.id
  });

  if (!customer) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No customer data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#133134]">{`${customer.first_name} ${customer.last_name}`}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <EnhancedStatCard
          title="Total Bookings"
          value={customerStats?.totalBookings.toString() || "0"}
          icon={Users}
          trend={{
            value: customerStats?.activeBookings.toString() || "0",
            isPositive: true,
            comparedTo: "active bookings"
          }}
          breakdown={[
            { label: "Active", value: customerStats?.activeBookings.toString() || "0", percentage: 60 },
            { label: "Completed", value: (customerStats?.totalBookings - (customerStats?.activeBookings || 0)).toString() || "0", percentage: 40 }
          ]}
        />

        <EnhancedStatCard
          title="Total Spent"
          value={`$${customerStats?.totalSpent.toFixed(2) || "0.00"}`}
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

      <CustomerStatsCards customer={customer} />
    </div>
  );
}