import { Activity } from "lucide-react";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";

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
    <EnhancedStatCard
      title="RV Types"
      value={String(rvTypes.length)}
      icon={Activity}
      breakdown={rvTypes}
    />
  );
}