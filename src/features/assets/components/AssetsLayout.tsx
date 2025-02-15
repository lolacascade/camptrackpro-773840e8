
import { Asset } from "@/types/asset";
import { AssetsHeader } from "./header/AssetsHeader";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { useToast } from "@/hooks/use-toast";
import { AssetsContent } from "./AssetsContent";
import { useAssetDrawer } from "../hooks/useAssetDrawer";

export function AssetsLayout() {
  const { toast } = useToast();

  const {
    isOpen: isDrawerOpen,
    selectedAsset,
    handleAddAsset,
    handleEditAsset,
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
    toast({
      title: "Coming Soon",
      description: "Asset details view is under development",
    });
  };

  return (
    <div className="space-y-6">
      <AssetsHeader onAddAsset={handleAddAsset} />
      <AssetStatsCards />
      <AssetsContent 
        onEdit={handleEditAsset}
        onViewDetails={handleViewDetails}
      />
      <AssetDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        onAssetAdded={handleAssetAdded}
        customerId={selectedAsset?.customer_id || null}
        asset={selectedAsset}
      />
    </div>
  );
}
