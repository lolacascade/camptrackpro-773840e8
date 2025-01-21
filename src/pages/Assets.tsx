import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { Asset } from "@/types/asset";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsDrawerOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
  };

  const getCustomerName = (customer: { first_name: string; last_name: string }) => {
    return `${customer.first_name} ${customer.last_name}`;
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Assets</h1>
            <Button 
              onClick={handleAddAsset}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Asset
            </Button>
          </div>

          <AssetStatsCards />
          <AssetTable onEdit={handleEditAsset} />

          <AssetDrawer
            asset={selectedAsset}
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onAssetUpdated={() => {
              // Trigger a refetch in AssetTable
              // This will be handled by the query invalidation
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}