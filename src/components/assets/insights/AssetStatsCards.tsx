import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Caravan, Activity, Wrench, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
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
  const session = useSession();
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();

  const { data: stats = defaultStats } = useQuery({
    queryKey: ['asset-stats', organizationId, accountId],
    queryFn: async (): Promise<AssetStats> => {
      if (!session?.user?.id) throw new Error("No authenticated user");
      if (!organizationId || !accountId) throw new Error("No organization or account context");

      // Fetch assets with their status and type
      const { data: assets } = await supabase
        .from('assets')
        .select(`
          id,
          asset_type,
          status,
          bookings_assets (
            booking_id,
            bookings (
              status
            )
          )
        `)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (!assets) return defaultStats;

      // Calculate motorhomes and trailers based on asset_type
      const motorhomes = assets.filter(a => 
        ['Class A', 'Class B', 'Class C'].includes(a.asset_type || '')
      ).length;
      
      const trailers = assets.filter(a => 
        ['Travel Trailer', 'Fifth Wheel', 'Pop-up Camper'].includes(a.asset_type || '')
      ).length;

      // Calculate utilization based on asset status
      const totalAssets = assets.length;
      const occupiedAssets = assets.filter(a => a.status === 'occupied').length;
      const utilizationPercentage = totalAssets > 0 
        ? Math.round((occupiedAssets / totalAssets) * 100)
        : 0;

      // Keep existing maintenance and bookings calculations
      const { data: maintenance } = await supabase
        .from('maintenance_requests')
        .select('status, id')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      const { data: bookings } = await supabase
        .from('bookings')
        .select('status')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      return {
        totalAssets: {
          motorhomes,
          trailers,
          underMaintenance: assets.filter(a => a.status === 'maintenance').length
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
    enabled: !!session?.user?.id && !!organizationId && !!accountId && !isLoadingOrg,
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