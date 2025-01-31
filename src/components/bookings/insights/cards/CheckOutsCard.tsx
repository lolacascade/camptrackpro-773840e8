import { StatsCard } from "@/components/common/StatsCard";
import { LogOut } from "lucide-react";

interface CheckOutsCardProps {
  value: number;
}

export function CheckOutsCard({ value }: CheckOutsCardProps) {
  return (
    <StatsCard
      title="Check-outs"
      value={value}
      icon={LogOut}
      breakdown={[
        { label: "Today", value: String(value) },
      ]}
    />
  );
}