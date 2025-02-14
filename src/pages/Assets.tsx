
import { useState } from "react";
import { Asset } from "@/types/asset";
import { PageContainer } from "@/components/layout/PageContainer";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { useAssets } from "@/hooks/assets/use-assets";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/hooks/use-organization";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();
  const { data: assets = [], isLoading: isLoadingAssets, error } = useAssets();
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
    toast({
      title: "Coming Soon",
      description: "Asset details view is under development",
    });
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
  };

  if (error || (!organizationId && !isLoadingOrg)) {
    setTimeout(() => {
      toast({
        title: "Error",
        description: error ? "Failed to load assets. Please try again." : "No organization found. Please set up your organization first.",
        variant: "destructive",
      });
    }, 0);
  }

  const isLoading = isLoadingOrg || isLoadingAssets;

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <AssetsHeader onAddAsset={handleAddAsset} />
          <AssetStatsCards />
          <AssetTable
            assets={assets}
            onEdit={handleEditClick}
            onViewDetails={handleViewDetails}
            isLoading={isLoading}
          />
          <AssetDrawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            onAssetAdded={() => {
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
