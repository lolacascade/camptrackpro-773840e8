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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*, customers(id, first_name, last_name), slots(id, name, dock)');
      
      if (error) throw error;
      return data || [];
    }
  });

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsDrawerOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (asset: Asset) => {
    // Implement view details functionality if needed
    console.log('View details:', asset);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
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
          <AssetTable 
            assets={assets} 
            onEdit={handleEditAsset} 
            onViewDetails={handleViewDetails}
          />

          <AssetDrawer
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onAssetUpdated={() => {
              // Trigger a refetch in AssetTable via React Query invalidation
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}