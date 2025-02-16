
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import type { Database } from "@/integrations/supabase/types";

export function useSupabaseClient() {
  const { organizationId, accountId, isLoading } = useOrganization();

  if (isLoading) {
    console.log('Waiting for organization context to load...');
  }

  // Return the standard client
  return supabase;
}
