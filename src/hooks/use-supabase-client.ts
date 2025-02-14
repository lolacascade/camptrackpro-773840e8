
import { useCallback } from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";

export function useSupabaseClient() {
  const { organizationId, accountId } = useOrganization();

  const from = useCallback(<T>(table: string) => {
    if (!organizationId || !accountId) {
      console.warn('Organization or account context not available');
      return supabase.from(table);
    }

    const query = supabase
      .from(table)
      .select();

    // Check if the table has organization_id and account_id columns
    // by attempting to use them in a filter
    try {
      return (query as PostgrestFilterBuilder<any, any, any>)
        .eq('organization_id', organizationId)
        .eq('account_id', accountId);
    } catch (error) {
      console.warn(`Table ${table} might not support organization/account filtering`);
      return query;
    }
  }, [organizationId, accountId]);

  return {
    ...supabase,
    from,
  };
}
