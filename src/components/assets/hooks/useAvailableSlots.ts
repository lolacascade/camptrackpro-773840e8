
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Asset } from "@/types/asset";
import { useOrganization } from "@/hooks/use-organization";

export interface SlotInfo {
  id: string;
  name: string;
}

export function useAvailableSlots(asset?: Asset) {
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();
  const [availableSlots, setAvailableSlots] = useState<SlotInfo[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAvailableSlots = async () => {
      try {
        if (!organizationId || !accountId) {
          return;
        }

        const { data, error } = await supabase
          .from('sites')
          .select('id, name')
          .eq('organization_id', organizationId)
          .eq('account_id', accountId);

        if (error) throw error;
        
        if (isMounted && data) {
          setAvailableSlots(data.map(slot => ({
            id: slot.id,
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
  }, [toast, organizationId, accountId, asset]);

  return availableSlots;
}
