
import { useState } from "react";
import { RV } from "@/types/rv";
import { useSession } from "@supabase/auth-helpers-react";
import { useAvailableSlots } from "./useAvailableSlots";
import { useRVSubmit } from "./useRVSubmit";
import { useOrganization } from "@/hooks/use-organization";

interface UseRVFormProps {
  onClose: () => void;
  onRVAdded: () => void;
  rv?: RV;
}

export function useRVForm({ onClose, onRVAdded, rv }: UseRVFormProps) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const availableSlots = useAvailableSlots(rv);
  const handleSubmit = useRVSubmit({ onClose, onRVAdded, rv });

  const [newRV, setNewRV] = useState<Partial<RV>>({
    make: rv?.make || '',
    model: rv?.model || '',
    year: rv?.year || null,
    site_id: rv?.site_id || null,
    organization_id: organizationId || '',
    account_id: accountId || '',
  });

  return {
    newRV,
    setNewRV,
    availableSlots,
    handleSubmit: () => handleSubmit(newRV)
  };
}
