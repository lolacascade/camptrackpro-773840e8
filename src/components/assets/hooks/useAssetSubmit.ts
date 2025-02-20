
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Asset } from "@/types/asset";
import { useOrganization } from "@/hooks/use-organization";

interface UseAssetSubmitProps {
  onClose: () => void;
  onAssetAdded: () => void;
  asset?: Asset;
}

export function useAssetSubmit({ onClose, onAssetAdded, asset }: UseAssetSubmitProps) {
  const { toast } = useToast();
  const session = useSession();
  const { organizationId, accountId } = useOrganization();

  const handleSubmit = async (newAsset: Partial<Asset>) => {
    if (!session?.user?.id || !organizationId || !accountId) {
      toast({
        title: "Error",
        description: "You must be signed in to add RVs.",
        variant: "destructive",
      });
      return;
    }

    if (!newAsset.make || !newAsset.model) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      const assetData = {
        make: newAsset.make,
        model: newAsset.model,
        year: newAsset.year,
        site_id: newAsset.site_id,
        organization_id: organizationId,
        account_id: accountId
      };

      if (asset?.id) {
        const { error } = await supabase
          .from('rvs')
          .update(assetData)
          .eq('id', asset.id)
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "RV updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('rvs')
          .insert([assetData])
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "RV added successfully.",
        });
      }

      onClose();
      onAssetAdded();
    } catch (error: any) {
      console.error('Error saving RV:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save RV. Please try again.",
        variant: "destructive",
      });
    }
  };

  return handleSubmit;
}
