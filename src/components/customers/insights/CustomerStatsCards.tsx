import { Customer } from "@/types/customer";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useProfile } from "@/hooks/use-profile";
import { StatsCard } from "@/components/common/StatsCard";
import { Ship, Calendar, Star } from "lucide-react";

interface CustomerStatsCardsProps {
  customer: Customer | null;
}

export function CustomerStatsCards({ customer }: CustomerStatsCardsProps) {
  const { data: profile } = useProfile();

  if (!customer) return null;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <StatsCard
        title="Active Assets"
        value="2"
        icon={Ship}
        trend={{
          value: "1 more",
          isPositive: true,
          comparedTo: "than last month"
        }}
        breakdown={[
          { label: "Long-term", value: "1" },
          { label: "Short-term", value: "1" }
        ]}
      />
      <StatsCard
        title="Customer Rating"
        value="4.8"
        icon={Star}
        trend={{
          value: "0.2",
          isPositive: true,
          comparedTo: "than average"
        }}
        breakdown={[
          { label: "Total Reviews", value: "12" },
          { label: "Last Review", value: format(new Date(), 'MMM dd, yyyy') }
        ]}
      />
      <StatsCard
        title="Average Stay"
        value="45 days"
        icon={Calendar}
        trend={{
          value: "5 days",
          isPositive: true,
          comparedTo: "than average"
        }}
        breakdown={[
          { label: "Longest Stay", value: "60 days" },
          { label: "Shortest Stay", value: "30 days" }
        ]}
      />
    </div>
  );
}