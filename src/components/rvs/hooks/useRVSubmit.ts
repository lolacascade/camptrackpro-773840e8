
import { useOrganization } from "@/hooks/use-organization";
import { RV } from "@/types/rv";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

interface UseRVSubmitProps {
  onClose: () => void;
  onRVAdded: () => void;
  rv?: RV;
}

export function useRVSubmit({ onClose, onRVAdded, rv }: UseRVSubmitProps) {
  const { organizationId, accountId } = useOrganization();
  const queryClient = useQueryClient();

  return async (newRV: Partial<RV>) => {
    try {
      if (!organizationId || !accountId) {
        throw new Error("Missing organization or account context");
      }

      if (rv?.id) {
        const { error } = await supabase
          .from("rvs")
          .update({
            make: newRV.make,
            model: newRV.model,
            year: newRV.year,
            organization_id: organizationId,
            account_id: accountId,
          })
          .eq("id", rv.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("rvs")
          .insert([{
            make: newRV.make,
            model: newRV.model,
            year: newRV.year,
            organization_id: organizationId,
            account_id: accountId,
          }]);

        if (error) throw error;
      }

      await queryClient.invalidateQueries({ queryKey: ["rvs"] });
      onRVAdded();
      onClose();
    } catch (error) {
      console.error("Error saving RV:", error);
      throw error;
    }
  };
}
