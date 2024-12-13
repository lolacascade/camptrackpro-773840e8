import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/types/asset";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { useSession } from "@supabase/auth-helpers-react";

interface AddAssetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetAdded: () => void;
}

export function AddAssetDialog({ isOpen, onClose, onAssetAdded }: AddAssetDialogProps) {
  const { toast } = useToast();
  const session = useSession();
  const [availableSlots, setAvailableSlots] = useState<Array<{ id: number; name: string }>>([]);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    asset_name: '',
    asset_size: '',
    customer_id: null,
    slip_id: null,
    asset_type: 'boat',
  });

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const { data, error } = await supabase
        .from('slots')
        .select('id, name')
        .eq('status', 'available');

      if (error) {
        console.error('Error fetching slots:', error);
        return;
      }

      setAvailableSlots(data || []);
    };

    if (isOpen) {
      fetchAvailableSlots();
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    if (!session) {
      toast({
        title: "Error",
        description: "You must be signed in to add assets.",
        variant: "destructive",
      });
      return;
    }

    if (!newAsset.asset_name || !newAsset.asset_size || !newAsset.asset_type || !newAsset.slip_id) {
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
        .insert({
          asset_name: newAsset.asset_name,
          asset_size: newAsset.asset_size,
          asset_type: newAsset.asset_type,
          slip_id: newAsset.slip_id,
          user_id: session.user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      onClose();
      setNewAsset({
        asset_name: '',
        asset_size: '',
        customer_id: null,
        slip_id: null,
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
              value={newAsset.asset_name || ''}
              onChange={(e) => setNewAsset(prev => ({ ...prev, asset_name: e.target.value }))}
              placeholder="Enter asset name"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset_size">Size *</Label>
            <Input
              id="asset_size"
              value={newAsset.asset_size || ''}
              onChange={(e) => setNewAsset(prev => ({ ...prev, asset_size: e.target.value }))}
              placeholder="e.g., 32 ft"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset_type">Asset Type *</Label>
            <Select
              value={newAsset.asset_type || ''}
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
          <div className="grid gap-2">
            <Label htmlFor="slip_id">Slot *</Label>
            <Select
              value={newAsset.slip_id?.toString() || ''}
              onValueChange={(value) => setNewAsset(prev => ({ ...prev, slip_id: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a slot" />
              </SelectTrigger>
              <SelectContent>
                {availableSlots.map((slot) => (
                  <SelectItem key={slot.id} value={slot.id.toString()}>
                    {slot.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSubmit}>Add Asset</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}