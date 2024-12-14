import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AssetFormFields } from "./form/AssetFormFields";
import { useAssetForm } from "./hooks/useAssetForm";

interface AddAssetDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetAdded: () => void;
}

export function AddAssetDialog({ isOpen, onClose, onAssetAdded }: AddAssetDialogProps) {
  const { newAsset, setNewAsset, availableSlots, handleSubmit } = useAssetForm({ 
    onClose, 
    onAssetAdded 
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Asset</DialogTitle>
        </DialogHeader>
        <AssetFormFields
          newAsset={newAsset}
          setNewAsset={setNewAsset}
          availableSlots={availableSlots}
        />
        <Button onClick={handleSubmit}>Add Asset</Button>
      </DialogContent>
    </Dialog>
  );
}