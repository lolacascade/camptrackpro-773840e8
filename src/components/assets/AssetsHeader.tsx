import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AssetsHeaderProps {
  onAddAsset: () => void;
}I'll help refactor the Assets page into smaller, more manageable components while maintaining the exact same functionality. This will improve code organization and maintainability.

<lov-code>
Let's break down the Assets page into several smaller components:

1. First, create a new component for the "Add Asset" dialog:

<lov-write file_path="src/components/assets/AddAssetDialog.tsx">
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/types/asset";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface AddAssetDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssetAdded: () => void;
}

export function AddAssetDialog({ open, onOpenChange, onAssetAdded }: AddAssetDialogProps) {
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

      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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