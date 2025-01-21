import { useState } from "react";
import { Asset } from "@/types/asset";
import { PageContainer } from "@/components/layout/PageContainer";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { PageWithChat } from "@/components/layout/PageWithChat";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const session = useSession();

  const { data: assets = [] } = useQuery({
    queryKey: ['assets', session?.user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select(`
          *,
          customers (
            id,
            first_name,
            last_name
          ),
          slots:slip_id (
            id,
            name,
            dock
          )
        `);

      if (error) throw error;
      return data || [];
    },
    enabled: !!session?.user?.id,
  });

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
          <AssetStatsCards />
          <AssetTable
            assets={assets}
            onEdit={handleEditClick}
            onViewDetails={handleViewDetails}
          />
          <AssetDrawer
            open={isDrawerOpen}
            onClose={handleCloseDrawer}
            onAssetAdded={() => {
              // Refresh data or handle asset added
            }}
            customerId={selectedAsset?.customer_id || null}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}