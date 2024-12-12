import { StatCard } from "@/components/dashboard/StatCard";
import { ChartBar, Clock, MapPin, Users } from "lucide-react";
import { useAverageValue } from "@/hooks/customers/useAverageValue";
import { useAverageStayDuration } from "@/hooks/customers/useAverageStayDuration";
import { usePreferredSpot } from "@/hooks/customers/usePreferredSpot";
import { useCustomersToday } from "@/hooks/customers/useCustomersToday";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function CustomerInsights() {
  const { data: averageValue } = useAverageValue();
  const { data: avgStayDuration } = useAverageStayDuration();
  const { data: preferredSpot } = usePreferredSpot();
  const { data: customersToday } = useCustomersToday();
  const navigate = useNavigate();

  const quickActions = [
    { label: "Check-in Customer", action: () => navigate("/app/bookings/check-in") },
    { label: "Send Reminders", action: () => navigate("/app/customers") },
    { label: "New Maintenance Task", action: () => navigate("/app/maintenance/new") },
  ];

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Average Revenue Per Stay"
          value={averageValue || '$0.00'}
          description="Average revenue per booking"
          icon={ChartBar}
          trend="up"
          trendValue="Based on paid invoices"
        />
        <StatCard
          title="Average Stay Duration"
          value={avgStayDuration || '0 days'}
          description="Average length of stay per visit"
          icon={Clock}
          trend="up"
          trendValue="Calculated from bookings"
        />
        <StatCard
          title="Most Popular Location"
          value={preferredSpot || 'No bookings yet'}
          description="Most frequently booked spot"
          icon={MapPin}
          trend="up"
          trendValue="Based on booking history"
        />
        <StatCard
          title="Today's Check-ins"
          value={customersToday || 'No check-ins today'}
          description="Customers checking in today"
          icon={Users}
          trend="up"
          trendValue="Real-time updates"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {quickActions.map((action, index) => (
          <Button
            key={index}
            onClick={action.action}
            variant="outline"
            className="flex-1"
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}