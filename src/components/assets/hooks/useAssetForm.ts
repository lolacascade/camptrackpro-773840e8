import { useState, useEffect } from "react";
import { Asset } from "@/types/asset";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { useOrganization } from "@/hooks/use-organization";

interface UseAssetFormProps {
  onClose: () => void;
  onAssetAdded: () => void;
  customerId: string | null;
  asset?: Asset;
}

export function useAssetForm({ onClose, onAssetAdded, customerId, asset }: UseAssetFormProps) {
  const { toast } = useToast();
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [availableSlots, setAvailableSlots] = useState<Array<{ id: number; name: string }>>([]);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    asset_name: asset?.asset_name || '',
    asset_size: asset?.asset_size || '',
    customer_id: customerId || asset?.customer_id || null,
    site_id: asset?.site_id || null,
    asset_type: asset?.asset_type || '',
    name: asset?.name || '',
    type: asset?.type || '',
    status: asset?.status || 'available',
    daily_rate: asset?.daily_rate || 0,
    user_id: session?.user?.id || null,
    organization_id: organizationId || null,
    account_id: accountId || null
  });

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        if (!organizationId || !accountId) {
          console.error('No organization or account context found');
          return;
        }

        const query = supabase
          .from('sites')
          .select('id, name')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId);

        // If editing, include the current site even if occupied
        if (asset?.site_id) {
          query.or(`status.eq.available,id.eq.${asset.site_id}`);
        } else {
          query.eq('status', 'available');
        }

        const { data, error } = await query;

        if (error) throw error;
        setAvailableSlots(data || []);
      } catch (error) {
        console.error('Error fetching sites:', error);
        toast({
          title: "Error",
          description: "Failed to fetch available sites.",
          variant: "destructive",
        });
      }
    };

    fetchAvailableSlots();
  }, [toast, organizationId, accountId, asset]);

  const handleSubmit = async () => {
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
      setNewAsset({
        asset_name: '',
        asset_size: '',
        customer_id: null,
        site_id: null,
        asset_type: '',
        name: '',
        type: '',
        status: 'available',
        daily_rate: 0,
        user_id: session?.user?.id || null,
        organization_id: organizationId || null,
        account_id: accountId || null
      });
      
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

  return {
    newAsset,
    setNewAsset,
    availableSlots,
    handleSubmit
  };
}