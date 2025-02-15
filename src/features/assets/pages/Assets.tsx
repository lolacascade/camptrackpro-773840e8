
import { Asset } from "@/types/asset";
import { PageContainer } from "@/components/layout/PageContainer";
import { AssetsHeader } from "./components/header/AssetsHeader";
import { AssetDrawer } from "./components/drawer/AssetDrawer";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { useToast } from "@/hooks/use-toast";
import { AssetsProvider } from "./context/AssetsProvider";
import { AssetsContent } from "./components/AssetsContent";
import { useAssetDrawer } from "./hooks/useAssetDrawer";

export default function Assets() {
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
    <AssetsProvider>
      <PageWithChat>
        <PageContainer>
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
        </PageContainer>
      </PageWithChat>
    </AssetsProvider>
  );
}
