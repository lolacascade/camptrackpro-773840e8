
import { useCallback } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";
import type { Database } from "@/integrations/supabase/types";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";

export function useSupabaseClient() {
  const location = useLocation();
  const isPublicRoute = ['/signin', '/signup', '/reset-password'].includes(location.pathname);
  const { organizationId, accountId, isLoading, error } = useOrganization();

  if (!isPublicRoute && isLoading) {
    console.log('Waiting for organization context to load...');
  }

  if (!isPublicRoute && error) {
    console.error('Error in Supabase client setup:', error);
    toast.error("Unable to establish database connection. Please refresh the page.");
  }

  // Return the standard client
  return supabase;
}
