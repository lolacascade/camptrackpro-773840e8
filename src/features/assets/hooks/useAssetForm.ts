
import { useState } from "react";
import { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";
import { useAvailableSlots } from "./useAvailableSlots";
import { useAssetSubmit } from "./useAssetSubmit";
import { useOrganization } from "@/hooks/use-organization";

interface UseAssetFormProps {
  onClose: () => void;
  onAssetAdded: () => void;
  asset?: Asset;
}

export function useAssetForm({ onClose, onAssetAdded, asset }: UseAssetFormProps) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const availableSlots = useAvailableSlots(asset);
  const handleSubmit = useAssetSubmit({ onClose, onAssetAdded, asset });

  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    make: asset?.make || '',
    model: asset?.model || '',
    year: asset?.year || null,
    site_id: asset?.site_id || null,
    organization_id: organizationId || '',
    account_id: accountId || '',
  });

  return {
    newAsset,
    setNewAsset,
    availableSlots,
    handleSubmit: () => handleSubmit(newAsset)
  };
}
