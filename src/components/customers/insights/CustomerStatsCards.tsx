import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Calendar, DollarSign, Anchor, Bell } from "lucide-react";
import { format, addMonths } from "date-fns";

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
  // Mock dates for demonstration
  const startDate = new Date();
  const endDate = addMonths(startDate, 6);
  const renewalDate = addMonths(endDate, -1);

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Lease Details"
        value="6 Months"
        icon={Calendar}
        breakdown={[
          { 
            label: "Start Date", 
            value: format(startDate, "MM/dd/yyyy")
          },
          { 
            label: "End Date", 
            value: format(endDate, "MM/dd/yyyy")
          },
          { 
            label: "Renewal Date", 
            value: format(renewalDate, "MM/dd/yyyy")
          }
        ]}
      />
      <EnhancedStatCard
        title="Total Revenue"
        value="$12,500"
        icon={DollarSign}
        breakdown={[
          { 
            label: "Next Payment", 
            value: "$2,500",
            percentage: 20
          },
          { 
            label: "Due Date", 
            value: format(addMonths(startDate, 1), "MM/dd/yyyy")
          },
          { 
            label: "Status", 
            value: "Paid"
          }
        ]}
      />
      <EnhancedStatCard
        title="Asset Utilization"
        value="Sea Breeze II"
        icon={Anchor}
        breakdown={[
          { 
            label: "Lease Type", 
            value: "Long-Term"
          },
          { 
            label: "Usage", 
            value: "45 Days",
            percentage: 75
          },
          { 
            label: "Asset ID", 
            value: "BOAT-2024-001"
          }
        ]}
      />
      <EnhancedStatCard
        title="Key Alerts"
        value="2 Alerts"
        icon={Bell}
        trend={{
          value: "45 days",
          isPositive: true,
          comparedTo: "until expiry"
        }}
        breakdown={[
          { 
            label: "Maintenance", 
            value: "Good"
          },
          { 
            label: "Notes", 
            value: "Renewal Discussion Needed"
          }
        ]}
      />
    </div>
  );
}