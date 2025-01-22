import { useState } from "react";
import { Asset } from "@/types/asset";
import { PageContainer } from "@/components/layout/PageContainer";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { useAssets } from "@/hooks/assets/use-assets";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { Card } from "@/components/ui/card";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { data: assets = [], isLoading } = useAssets();

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsDrawerOpen(true);
  };

  const handleEditClick = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (asset: Asset) => {
    console.log("View details for asset:", asset);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <AssetsHeader onAddAsset={handleAddAsset} />
          <Card className="p-6">
            <AssetStatsCards />
            <div className="mt-6">
              <AssetTable
                assets={assets}
                onEdit={handleEditClick}
                onViewDetails={handleViewDetails}
                isLoading={isLoading}
              />
            </div>
          </Card>
          <AssetDrawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            onAssetAdded={() => {
              // Refresh will happen automatically via React Query
            }}
            customerId={selectedAsset?.customer_id || null}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}