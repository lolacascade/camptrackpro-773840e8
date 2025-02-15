
import { useState } from 'react';
import { Asset } from '@/types/asset';
import { useAssetsContext } from '../context/AssetsProvider';

interface UseAssetDrawerProps {
  onAssetAdded: () => void;
}

export function useAssetDrawer({ onAssetAdded }: UseAssetDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const { refetchAssets } = useAssetsContext();

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

  const handleSuccess = async () => {
    await refetchAssets();
    handleClose();
    onAssetAdded();
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
