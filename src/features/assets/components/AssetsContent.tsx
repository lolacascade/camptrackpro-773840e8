
import { useAssets } from "@/hooks/assets/use-assets";
import { AssetTable } from "./table/AssetTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Asset } from "@/types/asset";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { useToast } from "@/hooks/use-toast";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";

export function AssetsContent() {
  const { data: assets = [], isLoading, error } = useAssets();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsDrawerOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
  };

  const handleSuccess = () => {
    handleCloseDrawer();
    toast({
      title: "Success",
      description: selectedAsset ? "Asset updated successfully" : "Asset added successfully",
    });
  };

  const handleViewDetails = (asset: Asset) => {
    toast({
      title: "Coming Soon",
      description: "Asset details view is under development",
    });
  };

  if (error) {
    return (
      <div className="text-center py-4 text-red-500">
        Error loading assets. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-[#133134]">RVs</h1>
        <Button 
          onClick={handleAddAsset}
          className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
        >
          <Plus className="mr-2 h-4 w-4" /> Add RV
        </Button>
      </div>

      <AssetStatsCards />

      <AssetTable
        assets={assets}
        onEdit={handleEditAsset}
        onViewDetails={handleViewDetails}
        isLoading={isLoading}
      />

      <AssetDrawer
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
        onAssetAdded={handleSuccess}
        customerId={selectedAsset?.customer_id || null}
        asset={selectedAsset || undefined}
      />
    </div>
  );
}
