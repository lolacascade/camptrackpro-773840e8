
import { useOrganization } from "@/hooks/use-organization";
import { RV } from "@/types/rv";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

      if (!newRV.make || !newRV.model) {
        toast.error("Please fill in all required fields");
        return;
      }

      const rvData = {
        make: newRV.make,
        model: newRV.model,
        year: newRV.year,
        organization_id: organizationId,
        account_id: accountId,
      };

      if (rv?.id) {
        const { error } = await supabase
          .from("rvs")
          .update(rvData)
          .eq("id", rv.id);

        if (error) throw error;
        toast.success("RV updated successfully");
      } else {
        const { error } = await supabase
          .from("rvs")
          .insert([rvData]);

        if (error) throw error;
        toast.success("RV added successfully");
      }

      await queryClient.invalidateQueries({ queryKey: ["rvs"] });
      onRVAdded();
      onClose();
    } catch (error) {
      console.error("Error saving RV:", error);
      toast.error("Failed to save RV");
      throw error;
    }
  };
}
