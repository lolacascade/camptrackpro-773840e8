import { useState } from "react";
import { DataTable } from "@/components/common/DataTable/DataTable";
import type { Column } from "@/components/common/DataTable/types";
import type { Asset } from "@/types/asset";
import { useAssets } from "@/hooks/assets/use-assets";
import { useSession } from "@supabase/auth-helpers-react";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { Badge } from "@/components/ui/badge";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { useToast } from "@/components/ui/use-toast";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";

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
          <AssetStatsCards />
          <DataTable
            data={assets || []}
            columns={columns}
            isLoading={isLoading}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            tableName="assets"
            onEdit={(asset) => {
              // Handle edit action
              console.log('Edit asset:', asset);
            }}
            onViewDetails={(asset) => {
              // Handle view details action
              console.log('View asset details:', asset);
            }}
            onDelete={(asset) => {
              // Handle delete action
              console.log('Delete asset:', asset);
            }}
          />
          <AssetDrawer 
            open={isAddAssetOpen}
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