import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Caravan, Activity, Wrench, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

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

  const { data: stats = defaultStats } = useQuery({
    queryKey: ['asset-stats'],
    queryFn: async (): Promise<AssetStats> => {
      if (!session?.user?.id) throw new Error("No authenticated user");

      // Fetch total assets and their types
      const { data: assets } = await supabase
        .from('assets')
        .select('asset_type, id')
        .eq('user_id', session.user.id);

      // Fetch maintenance requests
      const { data: maintenance } = await supabase
        .from('maintenance_requests')
        .select('status, id')
        .eq('user_id', session.user.id);

      // Fetch bookings
      const { data: bookings } = await supabase
        .from('bookings')
        .select('status, id')
        .eq('status', 'active');

      const motorhomes = assets?.filter(a => 
        ['Class A', 'Class B', 'Class C'].includes(a.asset_type || '')
      ).length || 0;
      
      const trailers = assets?.filter(a => 
        ['Travel Trailer', 'Fifth Wheel', 'Pop-up Camper'].includes(a.asset_type || '')
      ).length || 0;
      
      const underMaintenance = maintenance?.length || 0;

      return {
        totalAssets: {
          motorhomes,
          trailers,
          underMaintenance
        },
        utilization: {
          utilized: 75,
          available: 25
        },
        maintenance: {
          scheduled: maintenance?.filter(m => m.status === 'scheduled').length || 0,
          overdue: maintenance?.filter(m => m.status === 'overdue').length || 0
        },
        bookings: {
          active: bookings?.filter(b => b.status === 'active').length || 0,
          upcoming: bookings?.filter(b => b.status === 'pending').length || 0
        }
      };
    },
    enabled: !!session?.user?.id,
  });

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <EnhancedStatCard
        title="Total RVs"
        value={`${(stats.totalAssets.motorhomes || 0) + (stats.totalAssets.trailers || 0)}`}
        icon={Caravan}
        breakdown={[
          { label: "Motorhomes", value: stats.totalAssets.motorhomes.toString(), percentage: 70 },
          { label: "Trailers", value: stats.totalAssets.trailers.toString(), percentage: 30 }
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
        value={`${stats.maintenance.scheduled + stats.maintenance.overdue}`}
        icon={Wrench}
        trend={{
          value: "2 tasks",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Scheduled", value: stats.maintenance.scheduled.toString(), percentage: 60 },
          { label: "Overdue", value: stats.maintenance.overdue.toString(), percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="Bookings"
        value={`${stats.bookings.active + stats.bookings.upcoming}`}
        icon={Calendar}
        trend={{
          value: "3 bookings",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Active", value: stats.bookings.active.toString(), percentage: 80 },
          { label: "Upcoming", value: stats.bookings.upcoming.toString(), percentage: 20 }
        ]}
      />
    </div>
  );
}