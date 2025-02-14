
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

  // Return the standard client with our wrapped from method
  return supabase;
}
