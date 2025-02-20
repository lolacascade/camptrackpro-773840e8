
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useOrganization } from "@/hooks/use-organization";
import { Asset } from "@/types/asset";

export function useAvailableSlots(asset?: Asset) {
  const { toast } = useToast();
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();
  const [availableSlots, setAvailableSlots] = useState<Array<{ id: number; name: string }>>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAvailableSlots = async () => {
      try {
        if (!organizationId || !accountId || isLoadingOrg) {
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
        
        if (isMounted) {
          setAvailableSlots(data?.map(slot => ({
            id: Number(slot.id),
            name: slot.name
          })) || []);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
        if (isMounted) {
          toast({
            title: "Error",
            description: "Failed to fetch available sites.",
            variant: "destructive",
          });
        }
      }
    };

    fetchAvailableSlots();

    return () => {
      isMounted = false;
    };
  }, [toast, organizationId, accountId, asset, isLoadingOrg]);

  return availableSlots;
}
