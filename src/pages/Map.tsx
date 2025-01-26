import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function Map() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();
  
  const { data: stats } = useQuery({
    queryKey: ['marina-stats', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) {
        return {
          totalSites: 0,
          occupiedSites: 0,
          maintenanceSites: 0,
          occupancyRate: 0
        };
      }

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
    },
    enabled: !!organizationId && !!accountId
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
            <Card className="p-6">
              <h3 className="text-sm text-gray-600">Total Sites</h3>
              <p className="text-2xl font-bold mt-2">{stats?.totalSites || 0}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm text-gray-600">Occupied Sites</h3>
              <p className="text-2xl font-bold mt-2">{stats?.occupiedSites || 0}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm text-gray-600">Maintenance</h3>
              <p className="text-2xl font-bold mt-2">{stats?.maintenanceSites || 0}</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-sm text-gray-600">Occupancy Rate</h3>
              <p className="text-2xl font-bold mt-2">{stats?.occupancyRate || 0}%</p>
            </Card>
          </div>
        </div>
      </PageContainer>
    </PageWithChat>
  );
}