import { StatsCard } from "@/components/common/StatsCard";
import { LogIn } from "lucide-react";

interface CheckInsCardProps {
  value: number;
}

export function CheckInsCard({ value }: CheckInsCardProps) {
  return (
    <StatsCard
      title="Check-ins"
      value={value}
      icon={LogIn}
      breakdown={[
        { label: "Today", value: String(value) },
      ]}
    />
  );
}