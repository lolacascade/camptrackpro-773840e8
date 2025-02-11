
import { useState } from "react";
import { Asset } from "@/types/asset";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";
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
  const { organizationId, accountId } = useOrganization();
  const availableSlots = useAvailableSlots(asset);
  const handleSubmit = useAssetSubmit({ onClose, onAssetAdded, asset });

  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    asset_name: asset?.asset_name || '',
    asset_size: asset?.asset_size || '',
    customer_id: customerId || asset?.customer_id || null,
    site_id: asset?.site_id || null,
    asset_type: asset?.asset_type || '',
    type: asset?.type || asset?.asset_type || '', // Set type equal to asset_type if available
    name: asset?.name || '',
    status: asset?.status || 'available',
    daily_rate: asset?.daily_rate || 0,
    user_id: session?.user?.id || null,
    organization_id: organizationId || null,
    account_id: accountId || null
  });

  return {
    newAsset,
    setNewAsset,
    availableSlots,
    handleSubmit: () => handleSubmit(newAsset)
  };
}
