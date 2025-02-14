
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
      // First select all columns
      const baseQuery = query.select('*');
      
      try {
        // Attempt to add organization and account filters
        return baseQuery
          .eq('organization_id', organizationId)
          .eq('account_id', accountId);
      } catch {
        // If the filters fail (table doesn't have these columns), return base query
        return baseQuery;
      }
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
