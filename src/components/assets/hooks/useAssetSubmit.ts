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
        description: "You must be signed in to add assets.",
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
      const assetData = {
        asset_name: newAsset.asset_name,
        asset_size: newAsset.asset_size || null,
        asset_type: newAsset.asset_type || null,
        site_id: newAsset.site_id,
        customer_id: newAsset.customer_id,
        name: newAsset.asset_name,
        type: newAsset.asset_type || null,
        status: 'available',
        daily_rate: newAsset.daily_rate || 0,
        user_id: session.user.id,
        organization_id: organizationId,
        account_id: accountId
      };

      if (asset?.id) {
        const { error } = await supabase
          .from('assets')
          .update(assetData)
          .eq('id', asset.id)
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Asset updated successfully.",
        });
      } else {
        const { error } = await supabase
          .from('assets')
          .insert([assetData])
          .select()
          .single();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Asset added successfully.",
        });
      }

      onClose();
      onAssetAdded();
    } catch (error) {
      console.error('Error saving asset:', error);
      toast({
        title: "Error",
        description: "Failed to save asset. Please try again.",
        variant: "destructive",
      });
    }
  };

  return handleSubmit;
}