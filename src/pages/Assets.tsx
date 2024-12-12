import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { AddAssetDialog } from "@/components/assets/AddAssetDialog";
import { Asset } from "@/types/asset";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export default function Assets() {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('assets')
          .select(`
            id,
            asset_name,
            asset_size,
            asset_type,
            customer_id,
            slot_id,
            customers (
              name
            ),
            slots (
              name,
              dock
            )
          `)
          .order('asset_name');

        if (error) {
          console.error('Error fetching assets:', error);
          throw error;
        }

        // Transform the data to match the Asset interface
        const transformedData = data.map(asset => ({
          id: asset.id,
          asset_name: asset.asset_name,
          asset_size: asset.asset_size,
          asset_type: asset.asset_type || '',
          customer_id: asset.customer_id,
          slot_id: asset.slot_id,
          customers: asset.customers,
          slots: asset.slots
        }));

        return transformedData;
      } catch (error) {
        console.error('Error fetching assets:', error);
        toast({
          title: "Error",
          description: "Failed to load assets.",
          variant: "destructive",
        });
        return [];
      }
    },
  });

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (asset: Asset) => {
    // For now, we'll use the same drawer for both edit and view
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#133134]">Assets</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Asset
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <AssetTable
          assets={assets}
          onEdit={handleEdit}
          onViewDetails={handleViewDetails}
        />
      )}

      <AddAssetDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onAssetAdded={refetch}
      />

      <AssetDrawer
        asset={selectedAsset}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedAsset(null);
        }}
        onAssetUpdated={refetch}
      />
    </div>
  );
}