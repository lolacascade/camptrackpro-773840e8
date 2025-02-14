
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import type { Database } from "@/integrations/supabase/types";

export function useSupabaseClient() {
  const { organizationId, accountId } = useOrganization();

  const from = useCallback(<T extends keyof Database['public']['Tables']>(table: T) => {
    if (!organizationId || !accountId) {
      console.warn('Organization or account context not available');
      return supabase.from(table);
    }

    // Return the base query without filters, let components chain their own select and filters
    return supabase.from(table);
  }, [organizationId, accountId]);

  return {
    ...supabase,
    from,
  };
}
