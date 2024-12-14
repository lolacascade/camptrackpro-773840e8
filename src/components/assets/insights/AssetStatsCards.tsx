import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Ship, Activity, Wrench, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

interface AssetStats {
  totalAssets: {
    boats: number;
    jetSkis: number;
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

export function AssetStatsCards() {
  const session = useSession();

  const { data: stats } = useQuery({
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

      const boats = assets?.filter(a => a.asset_type === 'boat').length || 0;
      const jetSkis = assets?.filter(a => a.asset_type === 'jet-ski').length || 0;
      const underMaintenance = maintenance?.length || 0;

      return {
        totalAssets: {
          boats,
          jetSkis,
          underMaintenance
        },
        utilization: {
          utilized: 75, // Example value - calculate based on your business logic
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
        title="Total Assets"
        value={`${(stats?.totalAssets.boats || 0) + (stats?.totalAssets.jetSkis || 0)}`}
        icon={Ship}
        breakdown={[
          { label: "Boats", value: stats?.totalAssets.boats.toString() || "0", percentage: 70 },
          { label: "Jet Skis", value: stats?.totalAssets.jetSkis.toString() || "0", percentage: 30 }
        ]}
      />
      <EnhancedStatCard
        title="Current Utilization"
        value={`${stats?.utilization.utilized || 0}%`}
        icon={Activity}
        trend={{
          value: "5%",
          isPositive: true,
          comparedTo: "last month"
        }}
        breakdown={[
          { label: "Utilized", value: `${stats?.utilization.utilized || 0}%`, percentage: stats?.utilization.utilized || 0 },
          { label: "Available", value: `${stats?.utilization.available || 0}%`, percentage: stats?.utilization.available || 0 }
        ]}
      />
      <EnhancedStatCard
        title="Maintenance Status"
        value={`${(stats?.maintenance.scheduled || 0) + (stats?.maintenance.overdue || 0)}`}
        icon={Wrench}
        trend={{
          value: "2 tasks",
          isPositive: false,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Scheduled", value: stats?.maintenance.scheduled.toString() || "0", percentage: 60 },
          { label: "Overdue", value: stats?.maintenance.overdue.toString() || "0", percentage: 40 }
        ]}
      />
      <EnhancedStatCard
        title="Bookings"
        value={`${(stats?.bookings.active || 0) + (stats?.bookings.upcoming || 0)}`}
        icon={Calendar}
        trend={{
          value: "3 bookings",
          isPositive: true,
          comparedTo: "last week"
        }}
        breakdown={[
          { label: "Active", value: stats?.bookings.active.toString() || "0", percentage: 80 },
          { label: "Upcoming", value: stats?.bookings.upcoming.toString() || "0", percentage: 20 }
        ]}
      />
    </div>
  );
}