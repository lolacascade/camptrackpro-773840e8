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
import { Plus } from "lucide-react";

export default function Sitemap() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { organizationId, accountId } = useOrganization();

  const { data: stats } = useQuery({
    queryKey: ['site-stats', organizationId, accountId],
    queryFn: async () => {
      if (!organizationId || !accountId) return null;

      const { data: sites } = await supabase
        .from('sites')
        .select('*')
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);

      if (!sites) return null;

      const totalSlots = sites.length;
      const occupiedSlots = sites.filter(site => site.status === 'occupied').length;
      const maintenanceSlots = sites.filter(site => site.status === 'maintenance').length;
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

  const siteFields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true }
  ];

  return (
    <PageWithChat>
      <PageContainer className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-[#133134]">Sitemap</h1>
          <Button onClick={() => setIsDrawerOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Site
          </Button>
        </div>

        {stats && (
          <SitemapStats
            totalSlots={stats.totalSlots}
            occupiedSlots={stats.occupiedSlots}
            maintenanceSlots={stats.maintenanceSlots}
            occupancyRate={stats.occupancyRate}
          />
        )}

        <SiteTable />

        <EntityDrawer
          entity={null}
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          onEntityUpdated={() => setIsDrawerOpen(false)}
          title="Site"
          fields={siteFields}
          tableName="sites"
        />
      </PageContainer>
    </PageWithChat>
  );
}