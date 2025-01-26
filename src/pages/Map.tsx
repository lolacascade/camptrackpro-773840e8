import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AddDockSpotDialog } from "@/components/marina/dock-spot-dialog/AddDockSpotDialog";

export default function Map() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();
  
  const { data: stats } = useQuery({
    queryKey: ['marina-stats'],
    queryFn: async () => {
      const { data: sites } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      const totalSites = sites?.length || 0;
      const occupiedSites = sites?.filter(site => site.status === 'occupied').length || 0;
      const maintenanceSites = sites?.filter(site => site.status === 'maintenance').length || 0;
      const occupancyRate = totalSites > 0 ? Math.round((occupiedSites / totalSites) * 100) : 0;

      return {
        totalSites,
        occupiedSites,
        maintenanceSites,
        occupancyRate
      };
    }
  });

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">MAP</h1>
            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Spot
            </Button>
          </div>
          
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <EnhancedStatCard
              title="Total Sites"
              value={`${stats?.totalSites || 0}`}
              icon={Anchor}
              breakdown={[
                { label: "Occupied", value: stats?.occupiedSites.toString() || "0", percentage: stats?.occupancyRate || 0 },
                { label: "Available", value: ((stats?.totalSites || 0) - (stats?.occupiedSites || 0)).toString(), percentage: 100 - (stats?.occupancyRate || 0) }
              ]}
            />
            <EnhancedStatCard
              title="Active RVs"
              value={`${stats?.occupiedSites || 0}`}
              icon={Ship}
              trend={{
                value: "3 RVs",
                isPositive: true,
                comparedTo: "last week"
              }}
              breakdown={[
                { label: "Long-term", value: Math.round((stats?.occupiedSites || 0) * 0.7).toString(), percentage: 70 },
                { label: "Short-term", value: Math.round((stats?.occupiedSites || 0) * 0.3).toString(), percentage: 30 }
              ]}
            />
            <EnhancedStatCard
              title="Maintenance"
              value={`${stats?.maintenanceSites || 0}`}
              icon={Wrench}
              trend={{
                value: "2 sites",
                isPositive: false,
                comparedTo: "last week"
              }}
              breakdown={[
                { label: "Urgent", value: Math.round((stats?.maintenanceSites || 0) * 0.4).toString(), percentage: 40 },
                { label: "Scheduled", value: Math.round((stats?.maintenanceSites || 0) * 0.6).toString(), percentage: 60 }
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
