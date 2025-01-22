import { Star } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

interface RatingStatCardProps {
  rating: number;
}

export function RatingStatCard({ rating }: RatingStatCardProps) {
  return (
    <EnhancedStatCard
      title="Customer Rating"
      value={`${rating}/5`}
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
  );
}