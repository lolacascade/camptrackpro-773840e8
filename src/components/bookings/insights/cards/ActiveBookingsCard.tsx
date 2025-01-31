import { StatsCard } from "@/components/common/StatsCard";
import { CalendarDays } from "lucide-react";

interface ActiveBookingsCardProps {
  value: number;
}

export function ActiveBookingsCard({ value }: ActiveBookingsCardProps) {
  return (
    <StatsCard
      title="Active Bookings"
      value={value}
      icon={CalendarDays}
      breakdown={[
        { label: "Current", value: String(value) },
      ]}
    />
  );
}