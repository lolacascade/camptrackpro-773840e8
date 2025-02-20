
import { useState } from "react";
import { RV } from "@/types/rv";
import { useSession } from "@supabase/auth-helpers-react";
import { useOrganization } from "@/hooks/use-organization";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UseRVFormProps {
  onClose: () => void;
  onRVAdded: () => void;
  rv?: RV;
}

export function useRVForm({ onClose, onRVAdded, rv }: UseRVFormProps) {
  const session = useSession();
  const { organizationId, accountId } = useOrganization();

  const [newRV, setNewRV] = useState<Partial<RV>>({
    make: rv?.make || '',
    model: rv?.model || '',
    year: rv?.year || null,
    site_id: rv?.site_id || null,
    organization_id: organizationId || '',
    account_id: accountId || '',
  });

  const handleSubmit = async () => {
    if (!session?.user?.id || !organizationId || !accountId) {
      toast.error("You must be signed in to add RVs.");
      return;
    }

    if (!newRV.make || !newRV.model) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const rvData = {
        make: newRV.make,
        model: newRV.model,
        year: newRV.year,
        site_id: newRV.site_id,
        organization_id: organizationId,
        account_id: accountId
      };

      if (rv?.id) {
        const { error } = await supabase
          .from('rvs')
          .update(rvData)
          .eq('id', rv.id);

        if (error) throw error;
        toast.success("RV updated successfully");
      } else {
        const { error } = await supabase
          .from('rvs')
          .insert([rvData]);

        if (error) throw error;
        toast.success("RV added successfully");
      }

      onRVAdded();
      onClose();
    } catch (error: any) {
      console.error('Error saving RV:', error);
      toast.error(error.message || "Failed to save RV");
    }
  };

  return {
    newRV,
    setNewRV,
    handleSubmit
  };
}
