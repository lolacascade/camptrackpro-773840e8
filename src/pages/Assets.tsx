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
import { useToast } from "@/hooks/use-toast";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { data: assets = [], isLoading, error } = useAssets();
  const { toast } = useToast();

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
    // Implement view details functionality
    toast({
      title: "Coming Soon",
      description: "Asset details view is under development",
    });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
  };

  if (error) {
    toast({
      title: "Error",
      description: "Failed to load assets. Please try again.",
      variant: "destructive",
    });
  }

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
              toast({
                title: "Success",
                description: "Asset has been added successfully",
              });
            }}
            customerId={selectedAsset?.customer_id || null}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}