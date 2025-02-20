
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { useOrganization } from "@/hooks/use-organization";
import { supabase } from "@/integrations/supabase/client";
import { Asset } from "@/types/asset";

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
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be signed in to add RVs.",
        variant: "destructive",
      });
      return;
    }

    if (!organizationId || !accountId) {
      toast({
        title: "Error",
        description: "No organization or account context found.",
        variant: "destructive",
      });
      return;
    }

    if (!newAsset.asset_name || !newAsset.site_id) {
      toast({
        title: "Error",
        description: "Please fill in RV Name/Identifier and select a Site.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating RV with:', {
        ...newAsset,
        organization_id: organizationId,
        account_id: accountId
      });

      const assetData = {
        make: newAsset.asset_name,
        model: newAsset.asset_type || null,
        year: null,
        customer_id: newAsset.customer_id,
        organization_id: organizationId,
        account_id: accountId,
        user_id: session.user.id
      };

      if (asset?.id) {
        const { error } = await supabase
          .from('rvs')
          .update(assetData)
          .eq('id', asset.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating RV:', error);
          throw error;
        }

        toast({
          title: "Success",
          description: "RV updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('rvs')
          .insert([assetData])
          .select()
          .single();

        if (error) {
          console.error('Error creating RV:', error);
          throw error;
        }

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
