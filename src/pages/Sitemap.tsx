import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteTable } from "@/components/sites/SiteTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { SitemapStats } from "@/components/marina/sitemap/SitemapStats";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";

export default function Sitemap() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();

  const { data: stats } = useQuery({
    queryKey: ['site-stats', organizationId, accountId],
    queryFn: async () => {
      const { data: sites } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      const totalSlots = sites?.length || 0;
      const occupiedSlots = sites?.filter(site => site.status === 'occupied').length || 0;
      const maintenanceSlots = sites?.filter(site => site.status === 'maintenance').length || 0;
      const occupancyRate = totalSlots > 0 ? Math.round((occupiedSlots / totalSlots) * 100) : 0;

      return {
        totalSlots,
        occupiedSlots,
        maintenanceSlots,
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
            <h1 className="text-3xl font-semibold text-[#133134]">Sites</h1>
            <Button onClick={() => setIsDrawerOpen(true)}>
              Add Site
            </Button>
          </div>

          <SitemapStats
            totalSlots={stats?.totalSlots || 0}
            occupiedSlots={stats?.occupiedSlots || 0}
            maintenanceSlots={stats?.maintenanceSlots || 0}
            occupancyRate={stats?.occupancyRate || 0}
          />

          <SiteTable />

          <EntityDrawer
            entity={null}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onEntityUpdated={() => setIsDrawerOpen(false)}
            title="Site"
            fields={[
              { name: 'name', label: 'Name', type: 'text', required: true },
              { 
                name: 'status', 
                label: 'Status', 
                type: 'select',
                options: [
                  { value: 'available', label: 'Available' },
                  { value: 'occupied', label: 'Occupied' },
                  { value: 'maintenance', label: 'Maintenance' }
                ]
              },
              { name: 'location_identifier', label: 'Location', type: 'text' },
              { name: 'length_ft', label: 'Length (ft)', type: 'number' },
              { name: 'width_ft', label: 'Width (ft)', type: 'number' },
              { 
                name: 'is_covered', 
                label: 'Is Covered', 
                type: 'select',
                options: [
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' }
                ]
              },
              { 
                name: 'has_water', 
                label: 'Has Water', 
                type: 'select',
                options: [
                  { value: 'true', label: 'Yes' },
                  { value: 'false', label: 'No' }
                ]
              },
              { name: 'electricity_voltage', label: 'Electricity Voltage', type: 'text' },
            ]}
            tableName="sites"
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}