import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { DollarSign, CalendarCheck, AlertCircle, Star } from "lucide-react";

export function CustomerInsights() {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total Spend"
        value="$15,000"
        icon={DollarSign}
        trend={{
          value: "10%",
          isPositive: true,
          comparedTo: "last quarter"
        }}
        breakdown={[
          { label: "Slip Rentals", value: "$10,000", percentage: 67 },
          { label: "Maintenance", value: "$5,000", percentage: 33 }
        ]}
      />
      <EnhancedStatCard
        title="Active Bookings"
        value="3"
        icon={CalendarCheck}
        trend={{
          value: "1 booking",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Long-term", value: "2", percentage: 67 },
          { label: "Short-term", value: "1", percentage: 33 }
        ]}
      />
      <EnhancedStatCard
        title="Pending Payments"
        value="$2,000"
        icon={AlertCircle}
        trend={{
          value: "2 invoices",
          isPositive: false,
          comparedTo: "overdue"
        }}
        breakdown={[
          { label: "30 days", value: "$1,200", percentage: 60 },
          { label: "60 days", value: "$800", percentage: 40 }
        ]}
        recommendedActions={[
          { 
            label: "Send payment reminder",
            impact: "Reduce outstanding balance"
          }
        ]}
      />
      <EnhancedStatCard
        title="Customer Rating"
        value="4.8/5"
        icon={Star}
        trend={{
          value: "0.3",
          isPositive: true,
          comparedTo: "last rating"
        }}
        breakdown={[
          { label: "Service", value: "5.0/5", percentage: 100 },
          { label: "Timeliness", value: "4.5/5", percentage: 90 }
        ]}
      />
    </div>
  );
}