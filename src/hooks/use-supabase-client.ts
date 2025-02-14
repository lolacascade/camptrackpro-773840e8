
import { useCallback } from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import type { Database } from "@/integrations/supabase/types";

type TableName = keyof Database['public']['Tables']

export function useSupabaseClient() {
  const { organizationId, accountId } = useOrganization();

  const from = useCallback(<T extends TableName>(table: T) => {
    if (!organizationId || !accountId) {
      console.warn('Organization or account context not available');
      return supabase.from(table);
    }

    return supabase
      .from(table)
      .select()
      .eq('organization_id', organizationId)
      .eq('account_id', accountId);
  }, [organizationId, accountId]);

  return {
    ...supabase,
    from,
  };
}
