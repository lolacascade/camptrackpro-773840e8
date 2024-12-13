import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import type { Column } from "@/components/common/DataTable/types";
import type { Asset } from "@/types/asset";
import { useAssets } from "@/hooks/assets/use-assets";
import { useSession } from "@supabase/auth-helpers-react";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageStatsGrid } from "@/components/common/PageStatsGrid";
import { Badge } from "@/components/ui/badge";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AddAssetDialog } from "@/components/assets/AddAssetDialog";
import { useToast } from "@/components/ui/use-toast";

export default function Assets() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddAssetOpen, setIsAddAssetOpen] = useState(false);
  const session = useSession();
  const { data: assets, isLoading, error, refetch } = useAssets();
  const { toast } = useToast();

  const columns: Column<Asset>[] = [
    {
      header: "Asset Name",
      accessorKey: "asset_name",
      sortable: true,
    },
    {
      header: "Size",
      accessorKey: "asset_size",
      sortable: true,
    },
    {
      header: "Type",
      accessorKey: "asset_type",
      cell: (asset) => (
        <Badge variant="secondary">
          {asset.asset_type || 'Unspecified'}
        </Badge>
      ),
      sortable: true,
    },
    {
      header: "Customer",
      accessorKey: "customers",
      cell: (asset) => asset.customers?.name || 'Unassigned',
      sortable: true,
    },
    {
      header: "Slot",
      accessorKey: "slots",
      cell: (asset) => asset.slots?.name || 'Unassigned',
      sortable: true,
    },
  ];

  // Mock stats for demonstration
  const stats = {
    occupancyRate: 85,
    occupiedSlips: 42,
    totalSlips: 50,
    activeBoats: 38,
    monthlyRevenue: 45231,
    pendingMaintenance: 8
  };

  if (error) {
    toast({
      title: "Error loading assets",
      description: "Please try refreshing the page",
      variant: "destructive",
    });
    console.error('Error loading assets:', error);
  }

  if (!session) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <p className="text-lg text-gray-600">Please sign in to view assets</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <AssetsHeader onAddAsset={() => setIsAddAssetOpen(true)} />
          <PageStatsGrid title="Assets" stats={stats} />
          <DataTable
            data={assets || []}
            columns={columns}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            tableName="assets"
          />
          <AddAssetDialog 
            isOpen={isAddAssetOpen}
            onClose={() => setIsAddAssetOpen(false)}
            onAssetAdded={() => {
              refetch();
              toast({
                title: "Success",
                description: "Asset added successfully",
              });
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}