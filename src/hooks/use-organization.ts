
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type OrganizationRoleRow = Database['public']['Tables']['organization_roles']['Row'];
type AccountRoleRow = Database['public']['Tables']['account_roles']['Row'];

interface OrganizationContextData {
  organizationId: string | null;
  accountId: string | null;
  orgRole: string | null;
  accountRole: string | null;
  isLoading: boolean;
  error: Error | null;
  refreshContext: () => Promise<void>;
}

export function useOrganization(): OrganizationContextData {
  const { session, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const isPublicRoute = ['/', '/signin', '/signup', '/reset-password'].includes(location.pathname);

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-context', session?.user?.id],
    queryFn: async () => {
      if (!session?.user) {
        console.log('No session found in useOrganization');
        return null;
      }

      console.log('Current user ID:', session.user.id);
      
      try {
        // First query for organization role
        console.log('Querying organization roles...');
        const { data: orgData, error: orgError } = await supabase
          .from('organization_roles')
          .select('organization_id, role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        console.log('Organization query result:', { orgData, orgError });

        if (orgError) {
          console.error('Failed to fetch organization data:', orgError);
          throw orgError;
        }

        if (!orgData) {
          console.log('No organization role found for user');
          return null;
        }

        console.log('Found organization ID:', orgData.organization_id);

        // Then query for account role with detailed logging
        console.log('Querying account roles with params:', {
          user_id: session.user.id,
          organization_id: orgData.organization_id
        });
        
        const { data: accData, error: accError } = await supabase
          .from('account_roles')
          .select('account_id, role')
          .eq('user_id', session.user.id)
          .eq('organization_id', orgData.organization_id)
          .maybeSingle();

        console.log('Account query response:', { 
          data: accData, 
          error: accError ? {
            message: accError.message,
            details: accError.details,
            hint: accError.hint,
            code: accError.code
          } : null 
        });

        if (accError) {
          console.error('Failed to fetch account data:', {
            message: accError.message,
            details: accError.details,
            hint: accError.hint,
            code: accError.code
          });
          throw accError;
        }

        if (!accData) {
          console.log('No account role found');
          return null;
        }

        console.log('Found account ID:', accData.account_id);

        return {
          organizationId: orgData.organization_id,
          accountId: accData.account_id,
          orgRole: orgData.role,
          accountRole: accData.role
        };
      } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
      }
    },
    enabled: !!session?.user?.id && !isPublicRoute,
    staleTime: 30000,
    retry: false,
    meta: {
      onError: async (error: Error) => {
        console.error('Error in organization context:', error);
        toast.error("Unable to establish database connection. Please refresh the page.");
      }
    }
  });

  const refreshContext = async () => {
    await queryClient.invalidateQueries({ queryKey: ['organization-context', session?.user?.id] });
  };

  if (isPublicRoute) {
    return {
      organizationId: null,
      accountId: null,
      orgRole: null,
      accountRole: null,
      isLoading: false,
      error: null,
      refreshContext
    };
  }

  return {
    organizationId: data?.organizationId ?? null,
    accountId: data?.accountId ?? null,
    orgRole: data?.orgRole ?? null,
    accountRole: data?.accountRole ?? null,
    isLoading,
    error: error as Error | null,
    refreshContext
  };
}
