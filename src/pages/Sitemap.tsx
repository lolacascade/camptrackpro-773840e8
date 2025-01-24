import { PageContainer } from "@/components/layout/PageContainer";
import { SlotTable } from "@/components/marina/SlotTable";
import { EnhancedStatCard } from "@/components/dashboard/EnhancedStatCard";
import { Anchor, Ship, Activity, DollarSign } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddDockSpotDialog } from "@/components/marina/dock-spot-dialog/AddDockSpotDialog";

export default function Sitemap() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Sitemap</h1>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Spot
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <EnhancedStatCard
              title="Total Docks"
              value={`${stats?.totalSlots || 0}`}
              icon={Anchor}
              breakdown={[
                { label: "Occupied", value: stats?.occupiedSlots.toString() || "0", percentage: stats?.occupancyRate || 0 },
                { label: "Available", value: ((stats?.totalSlots || 0) - (stats?.occupiedSlots || 0)).toString(), percentage: 100 - (stats?.occupancyRate || 0) }
              ]}
            />
            <EnhancedStatCard
              title="Dock Utilization"
              value="85%"
              icon={Activity}
              trend={{
                value: "5%",
                isPositive: true,
                comparedTo: "last month"
              }}
              breakdown={[
                { label: "Peak Hours", value: "95%", percentage: 95 },
                { label: "Off Hours", value: "75%", percentage: 75 }
              ]}
            />
            <EnhancedStatCard
              title="Most Booked Site"
              value="Dock A-12"
              icon={Ship}
              trend={{
                value: "3 bookings",
                isPositive: true,
                comparedTo: "last week"
              }}
              breakdown={[
                { label: "This Month", value: "15 bookings", percentage: 100 },
                { label: "Last Month", value: "12 bookings", percentage: 80 }
              ]}
            />
            <EnhancedStatCard
              title="Current Occupancy"
              value={`${stats?.occupancyRate || 0}%`}
              icon={DollarSign}
              trend={{
                value: "8%",
                isPositive: true,
                comparedTo: "last month"
              }}
              breakdown={[
                { label: "Long-term", value: "70%", percentage: 70 },
                { label: "Short-term", value: "30%", percentage: 30 }
              ]}
            />
          </div>

          <SlotTable />
        </div>

        <AddDockSpotDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDockSpotAdded={() => {
            setIsDialogOpen(false);
            // Refresh the data
            window.location.reload();
          }}
        />
      </PageContainer>
    </PageWithChat>
  );
}