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
}

export function useAssetForm({ onClose, onAssetAdded, customerId }: UseAssetFormProps) {
  const { toast } = useToast();
  const session = useSession();
  const { organizationId, accountId } = useOrganization();
  const [availableSlots, setAvailableSlots] = useState<Array<{ id: number; name: string }>>([]);
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    asset_name: '',
    asset_size: '',
    customer_id: customerId,
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

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        if (!organizationId || !accountId) {
          console.error('No organization or account context found');
          return;
        }

        const { data, error } = await supabase
          .from('sites')
          .select('id, name')
          .eq('status', 'available')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId);

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
  }, [toast, organizationId, accountId]);

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

    // Only check for required fields
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
      console.error('Error adding asset:', error);
      toast({
        title: "Error",
        description: "Failed to add asset. Please try again.",
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