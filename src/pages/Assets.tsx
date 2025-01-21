import { useState } from "react";
import { Asset } from "@/types/asset";
import { Slot } from "@/types/slot";
import { PageContainer } from "@/components/layout/PageContainer";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

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
          slots:slots(
            id, name, dock, status, location_identifier, zone, length_ft, width_ft,
            is_covered, has_water, electricity_voltage, utility_connection_type,
            location_coordinates, customer_id, maintenance_id, created_at, updated_at,
            last_activity_at, user_id
          )
        `);

      if (error) throw error;

      return (data || []).map(asset => ({
        ...asset,
        user_id: session?.user?.id,
        slots: asset.slots ? (Array.isArray(asset.slots) ? asset.slots[0] : asset.slots) as Slot : null
      })) as Asset[];
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
    // Implement view details functionality
    console.log("View details for asset:", asset);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedAsset(null);
  };

  return (
    <PageContainer>
      <AssetsHeader onAddAsset={handleAddAsset} />
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
    </PageContainer>
  );
}