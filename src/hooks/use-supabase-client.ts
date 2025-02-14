
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import type { Database } from "@/integrations/supabase/types";
import type { SupabaseClient } from '@supabase/supabase-js';

type Tables = Database['public']['Tables'];

/**
 * Custom hook that provides a Supabase client with automatic organization and account context
 */
export function useSupabaseClient() {
  const { organizationId, accountId } = useOrganization();

  const from = useCallback(<T extends keyof Tables>(table: T) => {
    const query = supabase.from(table);

    // If we have org/account context, automatically filter by it
    if (organizationId && accountId) {
      const hasOrgId = 'organization_id' in (query as any).defaultFilter;
      const hasAccId = 'account_id' in (query as any).defaultFilter;

      return query
        .select('*')
        .eq(hasOrgId ? 'organization_id' : '', organizationId)
        .eq(hasAccId ? 'account_id' : '', accountId);
    }

    // Return unfiltered query if no context
    return query.select('*');
  }, [organizationId, accountId]);

  // Return enhanced client with our custom from method
  const client = {
    ...supabase,
    from,
  } satisfies SupabaseClient;

  return client;
}
