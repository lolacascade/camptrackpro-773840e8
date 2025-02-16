
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import type { Database } from "@/integrations/supabase/types";
import { useLocation } from "react-router-dom";

export function useSupabaseClient() {
  const location = useLocation();
  const isPublicRoute = ['/signin', '/signup', '/reset-password'].includes(location.pathname);
  const { organizationId, accountId, isLoading } = useOrganization();

  if (!isPublicRoute && isLoading) {
    console.log('Waiting for organization context to load...');
  }

  // Return the standard client
  return supabase;
}
