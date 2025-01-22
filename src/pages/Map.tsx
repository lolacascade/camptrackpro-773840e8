import { PageContainer } from "@/components/layout/PageContainer";
import { SlotTable } from "@/components/marina/SlotTable";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Anchor, Ship, Wrench, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Map() {
  const { data: stats } = useQuery({
    queryKey: ['marina-stats'],
    queryFn: async () => {
      const { data: slots } = await supabase
        .from('slots')
        .select('*');

      const totalSlots = slots?.length || 0;
      const occupiedSlots = slots?.filter(slot => slot.status === 'occupied').length || 0;
      const maintenanceSlots = slots?.filter(slot => slot.status === 'maintenance').length || 0;
      const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

      return {
        totalSlots,
        occupiedSlots,
        maintenanceSlots,
        occupancyRate
      };
    }
  });

  return (
    <PageContainer>
      <div className="space-y-8">
        <h1 className="text-3xl font-semibold text-[#133134]">Marina Map</h1>
        
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <EnhancedStatCard
            title="Total Sites"
            value={`${stats?.totalSlots || 0}`}
            icon={Anchor}
            breakdown={[
              { label: "Occupied", value: stats?.occupiedSlots.toString() || "0", percentage: stats?.occupancyRate || 0 },
              { label: "Available", value: ((stats?.totalSlots || 0) - (stats?.occupiedSlots || 0)).toString(), percentage: 100 - (stats?.occupancyRate || 0) }
            ]}
          />
          <EnhancedStatCard
            title="Active RVs"
            value={`${stats?.occupiedSlots || 0}`}
            icon={Ship}
            trend={{
              value: "3 RVs",
              isPositive: true,
              comparedTo: "last week"
            }}
            breakdown={[
              { label: "Long-term", value: Math.round((stats?.occupiedSlots || 0) * 0.7).toString(), percentage: 70 },
              { label: "Short-term", value: Math.round((stats?.occupiedSlots || 0) * 0.3).toString(), percentage: 30 }
            ]}
          />
          <EnhancedStatCard
            title="Maintenance"
            value={`${stats?.maintenanceSlots || 0}`}
            icon={Wrench}
            trend={{
              value: "2 sites",
              isPositive: false,
              comparedTo: "last week"
            }}
            breakdown={[
              { label: "Urgent", value: Math.round((stats?.maintenanceSlots || 0) * 0.4).toString(), percentage: 40 },
              { label: "Scheduled", value: Math.round((stats?.maintenanceSlots || 0) * 0.6).toString(), percentage: 60 }
            ]}
          />
          <EnhancedStatCard
            title="Revenue"
            value="$12,450"
            icon={DollarSign}
            trend={{
              value: "8%",
              isPositive: true,
              comparedTo: "last month"
            }}
            breakdown={[
              { label: "Site Rentals", value: "$8,715", percentage: 70 },
              { label: "Services", value: "$3,735", percentage: 30 }
            ]}
          />
        </div>

        <SlotTable />
      </div>
    </PageContainer>
  );
}