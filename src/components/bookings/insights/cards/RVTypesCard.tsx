import { StatsCard } from "@/components/common/StatsCard";
import { CaravanIcon } from "lucide-react";

interface RVType {
  label: string;
  value: string;
  percentage: number;
}

interface RVTypesCardProps {
  rvTypes: RVType[];
}

export function RVTypesCard({ rvTypes }: RVTypesCardProps) {
  return (
    <StatsCard
      title="RV Types"
      value={rvTypes[0]?.value || "0"}
      icon={CaravanIcon}
      breakdown={rvTypes.map(type => ({
        label: type.label,
        value: type.value,
        percentage: type.percentage
      }))}
    />
  );
}