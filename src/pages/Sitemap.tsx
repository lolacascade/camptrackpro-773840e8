import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { SiteTable } from "@/components/sites/SiteTable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { EntityDrawer } from "@/components/common/EntityDrawer";
import { SitemapStats } from "@/components/marina/sitemap/SitemapStats";

export default function Sitemap() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
            totalSlots={100}
            occupiedSlots={75}
            maintenanceSlots={5}
            occupancyRate={75}
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