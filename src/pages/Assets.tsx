import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { Asset } from "@/types/asset";
import { supabase } from "@/integrations/supabase/client";

export default function Assets() {
  const { toast } = useToast();
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newAsset, setNewAsset] = useState<Omit<Asset, 'id'>>({
    asset_name: '',
    asset_size: '',
    customer_id: null,
    slot_id: null,
    created_at: null,
    updated_at: null,
    asset_type: 'boat', // default to boat, can be changed as needed
  });

  const fetchAssets = async () => {
    try {
      console.log('Fetching assets...');
      const { data, error } = await supabase
        .from('assets')
        .select(`
          *,
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

      console.log('Assets data:', data);
      setAssets(data || []);
    } catch (error) {
      console.error('Error fetching assets:', error);
      toast({
        title: "Error",
        description: "Failed to load assets.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleSubmit = async () => {
    if (!newAsset.asset_name) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('assets')
        .insert([{
          asset_name: newAsset.asset_name,
          asset_size: newAsset.asset_size,
          customer_id: newAsset.customer_id,
          slot_id: newAsset.slot_id,
          asset_type: newAsset.asset_type,
        }]);

      if (error) throw error;

      setIsDialogOpen(false);
      setNewAsset({
        asset_name: '',
        asset_size: '',
        customer_id: null,
        slot_id: null,
        created_at: null,
        updated_at: null,
        asset_type: 'boat',
      });
      
      toast({
        title: "Success",
        description: "Asset added successfully.",
      });
      
      fetchAssets();
    } catch (error) {
      console.error('Error adding asset:', error);
      toast({
        title: "Error",
        description: "Failed to add asset.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  return (
    <div className="bg-white rounded-[24px] p-12 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#133134]">Assets</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Asset
          </Button>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="asset_name">Asset Name *</Label>
                <Input
                  id="asset_name"
                  value={newAsset.asset_name}
                  onChange={(e) => setNewAsset(prev => ({ ...prev, asset_name: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="asset_size">Size</Label>
                <Input
                  id="asset_size"
                  value={newAsset.asset_size || ''}
                  onChange={(e) => setNewAsset(prev => ({ ...prev, asset_size: e.target.value }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="customer_id">Customer ID</Label>
                <Input
                  id="customer_id"
                  type="number"
                  value={newAsset.customer_id || ''}
                  onChange={(e) => setNewAsset(prev => ({ ...prev, customer_id: parseInt(e.target.value) || null }))}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slot_id">Slot ID</Label>
                <Input
                  id="slot_id"
                  type="number"
                  value={newAsset.slot_id || ''}
                  onChange={(e) => setNewAsset(prev => ({ ...prev, slot_id: parseInt(e.target.value) || null }))}
                />
              </div>
              <Button onClick={handleSubmit}>Add Asset</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div>Loading assets...</div>
      ) : (
        <AssetTable
          assets={assets}
          onEdit={handleEdit}
        />
      )}

      <AssetDrawer
        asset={selectedAsset}
        open={isDrawerOpen}
        onClose={() => {
          setIsDrawerOpen(false);
          setSelectedAsset(null);
        }}
        onAssetUpdated={fetchAssets}
      />
    </div>
  );
}