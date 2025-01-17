import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormSelect } from "@/components/common/FormSelect";
import { Asset } from "@/types/asset";
import { AssetDrawer } from "@/components/assets/AssetDrawer";

interface AssetSelectProps {
  selectedAssetId: number | null;
  customerId: number | null;
  onAssetSelect: (assetId: number | null) => void;
}

export function AssetSelect({ selectedAssetId, customerId, onAssetSelect }: AssetSelectProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchAssets = async () => {
    if (!customerId) {
      setAssets([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('customer_id', customerId)
        .order('asset_name');
      
      if (error) throw error;
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, [customerId]);

  const assetOptions = assets.map(asset => ({
    value: asset.id.toString(),
    label: asset.asset_name
  }));

  const handleAssetAdded = () => {
    fetchAssets();
    setIsDrawerOpen(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label>RV</Label>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsDrawerOpen(true)}
          disabled={!customerId}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New
        </Button>
      </div>
      <FormSelect
        value={selectedAssetId?.toString() || ''}
        onValueChange={(value) => onAssetSelect(value ? parseInt(value) : null)}
        options={assetOptions}
        placeholder={customerId ? "Select an RV" : "Select a customer first"}
        disabled={isLoading || !customerId}
      />

      <AssetDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAssetUpdated={handleAssetAdded}
        customerId={customerId}
      />
    </div>
  );
}