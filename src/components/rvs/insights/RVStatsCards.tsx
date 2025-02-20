
import { StatsCard } from "@/components/common/stats/StatsCard";
import { useRVs } from "@/hooks/rvs/use-rvs";

export function RVStatsCards() {
  const { data: rvs = [] } = useRVs();

  const totalRVs = rvs.length;
  const assignedRVs = rvs.filter(rv => rv.site_id).length;
  const unassignedRVs = totalRVs - assignedRVs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatsCard
        title="Total RVs"
        value={totalRVs}
        description="Total number of RVs in the system"
      />
      <StatsCard
        title="Assigned RVs"
        value={assignedRVs}
        description="RVs assigned to a site"
      />
      <StatsCard
        title="Unassigned RVs"
        value={unassignedRVs}
        description="RVs not assigned to any site"
      />
    </div>
  );
}
