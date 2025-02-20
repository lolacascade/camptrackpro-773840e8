
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/hooks/use-toast";
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

  const handleSubmit = async (newAsset: Partial<Asset>) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be signed in to add RVs.",
        variant: "destructive",
      });
      return;
    }

    if (!newAsset.make || !newAsset.model || !newAsset.site_id) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    try {
      console.log('Creating RV with:', newAsset);

      const assetData = {
        make: newAsset.make,
        model: newAsset.model,
        year: newAsset.year,
        customer_id: newAsset.customer_id,
        site_id: newAsset.site_id,
      };

      if (asset?.id) {
        const { error } = await supabase
          .from('rvs')
          .update(assetData)
          .eq('id', asset.id)
          .select()
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
          .select()
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
