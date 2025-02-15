
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
import { useAssetFilters } from "@/features/assets/hooks/useAssetFilters";

export default function Assets() {
  // Organization context at the top level
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();
  
  // Data fetching with organization context
  const { 
    data: assets = [], 
    isLoading: isLoadingAssets, 
    error: assetsError,
    refetch: refetchAssets 
  } = useAssets();
  
  const { toast } = useToast();

  // Asset filtering
  const {
    filters,
    setFilters,
    customerOptions,
    filteredAssets
  } = useAssetFilters(assets);

  // Drawer state management
  const {
    isOpen: isDrawerOpen,
    selectedAsset,
    handleAddAsset,
    handleEditAsset,
    handleClose: handleCloseDrawer,
    handleSuccess: handleAssetAdded
  } = useAssetDrawer({
    onAssetAdded: () => {
      refetchAssets();
      toast({
        title: "Success",
        description: "Asset has been added successfully",
      });
    }
  });

  // View details handler (placeholder for future implementation)
  const handleViewDetails = (asset: Asset) => {
    toast({
      title: "Coming Soon",
      description: "Asset details view is under development",
    });
  };

  // Error handling
  if (assetsError || (!organizationId && !isLoadingOrg)) {
    const errorMessage = assetsError 
      ? "Failed to load assets. Please try again." 
      : "No organization found. Please set up your organization first.";
    
    toast({
      title: "Error",
      description: errorMessage,
      variant: "destructive",
    });
  }

  const isLoading = isLoadingOrg || isLoadingAssets;

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <AssetsHeader onAddAsset={handleAddAsset} />
          <AssetStatsCards />
          <AssetTable
            assets={filteredAssets}
            onEdit={handleEditAsset}
            onViewDetails={handleViewDetails}
            isLoading={isLoading}
            filters={filters}
            onFiltersChange={setFilters}
            customerOptions={customerOptions}
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
  );
}
