
import { useState } from "react";
import { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";
import { useAvailableSlots } from "./useAvailableSlots";
import { useAssetSubmit } from "./useAssetSubmit";

interface UseAssetFormProps {
  onClose: () => void;
  onAssetAdded: () => void;
  customerId: string | null;
  asset?: Asset;
}

export function useAssetForm({ onClose, onAssetAdded, customerId, asset }: UseAssetFormProps) {
  const session = useSession();
  const availableSlots = useAvailableSlots(asset);
  const handleSubmit = useAssetSubmit({ onClose, onAssetAdded, asset });

  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    make: asset?.make || '',
    model: asset?.model || '',
    year: asset?.year || null,
    customer_id: customerId || asset?.customer_id || null,
    site_id: asset?.site_id || null,
  });

  return {
    newAsset,
    setNewAsset,
    availableSlots,
    handleSubmit: () => handleSubmit(newAsset)
  };
}
