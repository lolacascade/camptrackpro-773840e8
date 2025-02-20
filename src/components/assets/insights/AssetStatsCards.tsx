
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Caravan, Activity, Wrench, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";

interface AssetStats {
  totalAssets: {
    motorhomes: number;
    trailers: number;
    underMaintenance: number;
  };
  utilization: {
    utilized: number;
    available: number;
  };
  maintenance: {
    scheduled: number;
    overdue: number;
  };
  bookings: {
    active: number;
    upcoming: number;
  };
}

const defaultStats: AssetStats = {
  totalAssets: {
    motorhomes: 0,
    trailers: 0,
    underMaintenance: 0
  },
  utilization: {
    utilized: 0,
    available: 0
  },
  maintenance: {
    scheduled: 0,
    overdue: 0
  },
  bookings: {
    active: 0,
    upcoming: 0
  }
};

export function AssetStatsCards() {
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();

  const { data: stats = defaultStats } = useQuery({
    queryKey: ['asset-stats', organizationId, accountId],
    queryFn: async (): Promise<AssetStats> => {
      if (!organizationId || !accountId) throw new Error("No organization or account context");

      // Fetch RVs with their status and type
      const { data: rvs } = await supabase
        .from('rvs')
        .select(`
          id,
          make,
          model,
          year,
          status
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (!rvs) return defaultStats;

      // Calculate totals based on RV makes/models
      const motorhomes = rvs.filter(rv => 
        ['Class A', 'Class B', 'Class C'].some(className => 
          rv.make?.toLowerCase().includes(className.toLowerCase())
        )
      ).length;
      
      const trailers = rvs.filter(rv => 
        ['Travel Trailer', 'Fifth Wheel', 'Pop-up'].some(trailerType => 
          rv.make?.toLowerCase().includes(trailerType.toLowerCase())
        )
      ).length;

      // Calculate utilization based on status
      const totalRVs = rvs.length;
      const occupiedRVs = rvs.filter(rv => rv.status === 'occupied').length;
      const utilizationPercentage = totalRVs > 0 
        ? Math.round((occupiedRVs / totalRVs) * 100)
        : 0;

      // Fetch maintenance data
      const { data: maintenance } = await supabase
        .from('maintenance_requests')
        .select('status')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      // Fetch bookings data
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      return {
        totalAssets: {
          motorhomes,
          trailers,
          underMaintenance: rvs.filter(rv => rv.status === 'maintenance').length
        },
        utilization: {
          utilized: utilizationPercentage,
          available: 100 - utilizationPercentage
        },
        maintenance: {
          scheduled: maintenance?.filter(m => m.status === 'scheduled').length || 0,
          overdue: maintenance?.filter(m => m.status === 'overdue').length || 0
        },
        bookings: {
          active: bookings?.filter(b => b.status === 'confirmed').length || 0,
          upcoming: bookings?.filter(b => b.status === 'pending').length || 0
        }
      };
    },
    enabled: !!organizationId && !!accountId && !isLoadingOrg,
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total RVs"
        value={String((stats.totalAssets.motorhomes || 0) + (stats.totalAssets.trailers || 0))}
        icon={Caravan}
        breakdown={[
          { label: "Motorhomes", value: String(stats.totalAssets.motorhomes), percentage: 70 },
          { label: "Trailers", value: String(stats.totalAssets.trailers), percentage: 30 }
        ]}
      />
      <EnhancedStatCard
        title="Current Utilization"
        value={`${stats.utilization.utilized}%`}
        icon={Activity}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Utilized", value: `${stats.utilization.utilized}%`, percentage: stats.utilization.utilized },
          { label: "Available", value: `${stats.utilization.available}%`, percentage: stats.utilization.available }
        ]}
      />
      <EnhancedStatCard
        title="Maintenance Status"
        value={String(stats.maintenance.scheduled + stats.maintenance.overdue)}
        icon={Wrench}
        trend={{
          value: "2 tasks",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Scheduled", value: String(stats.maintenance.scheduled), percentage: 60 },
          { label: "Overdue", value: String(stats.maintenance.overdue), percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="Bookings"
        value={String(stats.bookings.active + stats.bookings.upcoming)}
        icon={Calendar}
        trend={{
          value: "3 bookings",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Active", value: String(stats.bookings.active), percentage: 80 },
          { label: "Upcoming", value: String(stats.bookings.upcoming), percentage: 20 }
        ]}
      />
    </div>
  );
}
