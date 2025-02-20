
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

        const { data, error } = await supabase
          .from('sites')
          .select('id, name')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId)
          .or(`status.eq.available${asset?.site_id ? `,id.eq.${asset.site_id}` : ''}`);

        if (error) throw error;
        
        if (isMounted && data) {
          setAvailableSlots(data.map(slot => ({
            id: Number(slot.id),
            name: slot.name
          })));
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
