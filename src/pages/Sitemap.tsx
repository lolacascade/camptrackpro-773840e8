import { useState } from "react";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { getSlotColumns } from "@/components/marina/table/SlotTableColumns";
import { AddDockSpotDialog } from "@/components/marina/dock-spot-dialog/AddDockSpotDialog";
import { SitemapHeader } from "@/components/marina/sitemap/SitemapHeader";
import { SitemapStats } from "@/components/marina/sitemap/SitemapStats";
import { useSitemapData } from "@/components/marina/sitemap/useSitemapData";
import { Slot } from "@/types/slot";

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

          <DataTable<Slot>
            columns={getSlotColumns()}
            data={slots || []}
            isLoading={slotsLoading}
            tableName="slots"
          />
        </div>

        <AddDockSpotDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onDockSpotAdded={() => {
            setIsDialogOpen(false);
            window.location.reload();
          }}
        />
      </PageContainer>
    </PageWithChat>
  );
}