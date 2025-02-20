
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { SiteTable } from "@/components/sites/SiteTable";
import { SiteStats } from "@/components/sites/SiteStats";
import { useState } from "react";
import { useSiteSummary } from "@/hooks/use-site-summary";
import type { Field } from "@/components/common/EntityDrawer/types";

export default function Sitemap() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { data: stats } = useSiteSummary();

  const siteFields: Field[] = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "location_identifier",
      label: "Location",
      type: "text",
    },
    {
      name: "length_ft",
      label: "Length (ft)",
      type: "number",
    },
    {
      name: "width_ft",
      label: "Width (ft)",
      type: "number",
    },
    {
      name: "is_covered",
      label: "Covered",
      type: "checkbox",
    },
    {
      name: "has_water",
      label: "Water",
      type: "checkbox",
    },
    {
      name: "electricity_voltage",
      label: "Electricity",
      type: "text",
    }
  ];

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-[#133134]">Sitemap</h1>
            <Button onClick={() => setIsDrawerOpen(true)} className="bg-[#133134] hover:bg-[#0D2426] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Site
            </Button>
          </div>

          {stats && <SiteStats
            totalSites={stats.totalSites}
            availableSites={stats.availableSites}
            occupiedSites={stats.occupiedSites}
            occupancyRate={stats.occupancyRate}
          />}

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
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
