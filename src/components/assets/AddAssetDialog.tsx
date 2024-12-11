import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/types/asset";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

interface AddAssetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetAdded: () => void;
}

export function AddAssetDialog({ isOpen, onClose, onAssetAdded }: AddAssetDialogProps) {
  const { toast } = useToast();
  const [newAsset, setNewAsset] = useState<Omit<Asset, 'id'>>({
    asset_name: '',
    asset_size: '',
    customer_id: null,
    slot_id: null,
    created_at: null,
    updated_at: null,
    asset_type: 'boat',
  });

  const handleSubmit = async () => {
    if (!newAsset.asset_name || !newAsset.asset_size || !newAsset.asset_type) {
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
          asset_type: newAsset.asset_type,
        }]);

      if (error) throw error;

      onClose();
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
      
      onAssetAdded();
    } catch (error) {
      console.error('Error adding asset:', error);
      toast({
        title: "Error",
        description: "Failed to add asset.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              placeholder="Enter asset name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset_size">Size *</Label>
            <Input
              id="asset_size"
              value={newAsset.asset_size}
              onChange={(e) => setNewAsset(prev => ({ ...prev, asset_size: e.target.value }))}
              placeholder="e.g., 32 ft"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset_type">Asset Type *</Label>
            <Select
              value={newAsset.asset_type}
              onValueChange={(value) => setNewAsset(prev => ({ ...prev, asset_type: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select asset type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boat">Boat</SelectItem>
                <SelectItem value="jet_ski">Jet Ski</SelectItem>
                <SelectItem value="yacht">Yacht</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit}>Add Asset</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}