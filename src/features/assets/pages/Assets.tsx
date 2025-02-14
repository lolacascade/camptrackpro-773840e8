
import { Asset } from "@/types/asset";
import { PageContainer } from "@/components/layout/PageContainer";
import { AssetsHeader } from "@/features/assets/components/header/AssetsHeader";
import { AssetTable } from "@/features/assets/components/table/AssetTable";
import { AssetDrawer } from "@/features/assets/components/drawer/AssetDrawer";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/hooks/use-organization";
import { useAssets } from "@/hooks/assets/use-assets";
import { useAssetDrawer } from "@/features/assets/hooks/useAssetDrawer";

export default function Assets() {
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();
  const { data: assets = [], isLoading: isLoadingAssets, error } = useAssets();
  const { toast } = useToast();
  
  const {
    isOpen: isDrawerOpen,
    selectedAsset,
    handleAddAsset,
    handleEditAsset: handleEditClick,
    handleClose: handleCloseDrawer,
    handleSuccess: handleAssetAdded
  } = useAssetDrawer({
    onAssetAdded: () => {
      toast({
        title: "Success",
        description: "Asset has been added successfully",
      });
    }
  });

  const handleViewDetails = (asset: Asset) => {
    console.log("View details for asset:", asset);
    toast({
      title: "Coming Soon",
      description: "Asset details view is under development",
    });
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
            onAssetAdded={handleAssetAdded}
            customerId={selectedAsset?.customer_id || null}
            asset={selectedAsset || undefined}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
