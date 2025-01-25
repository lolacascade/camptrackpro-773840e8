import { useState } from "react";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { AddDockSpotDialog } from "@/components/marina/dock-spot-dialog/AddDockSpotDialog";
import { SitemapHeader } from "@/components/marina/sitemap/SitemapHeader";
import { SitemapStats } from "@/components/marina/sitemap/SitemapStats";
import { useSitemapData } from "@/components/marina/sitemap/useSitemapData";
import { SlotTable } from "@/components/marina/SlotTable";

export default function Sitemap() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { stats, statsLoading, slots, slotsLoading } = useSitemapData();

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-8">
          <SitemapHeader onAddSpot={() => setIsDialogOpen(true)} />
          
          {stats && (
            <SitemapStats
              totalSlots={stats.totalSlots}
              occupiedSlots={stats.occupiedSlots}
              maintenanceSlots={stats.maintenanceSlots}
              occupancyRate={stats.occupancyRate}
            />
          )}

          <SlotTable />
        </div>

        <AddDockSpotDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDockSpotAdded={() => {
            setIsDialogOpen(false);
          }}
        />
      </PageContainer>
    </PageWithChat>
  );
}