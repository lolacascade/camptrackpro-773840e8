
import { useState } from 'react';
import { Asset } from '@/types/asset';
import { useToast } from '@/hooks/use-toast';

interface UseAssetDrawerProps {
  onAssetAdded: () => void;
}

export function useAssetDrawer({ onAssetAdded }: UseAssetDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { toast } = useToast();

  const handleAddAsset = () => {
    setSelectedAsset(null);
    setIsOpen(true);
  };

  const handleEditAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedAsset(null);
  };

  const handleSuccess = () => {
    onAssetAdded();
    handleClose();
    toast({
      title: "Success",
      description: `Asset has been ${selectedAsset ? 'updated' : 'added'} successfully`,
    });
  };

  return {
    isOpen,
    selectedAsset,
    handleAddAsset,
    handleEditAsset,
    handleClose,
    handleSuccess,
  };
}
