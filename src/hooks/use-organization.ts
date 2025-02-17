
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type OrganizationRoleRow = Database['public']['Tables']['organization_roles']['Row'];
type AccountRoleRow = Database['public']['Tables']['account_roles']['Row'];

// Define the exact shape of our query response
interface RoleQueryResponse {
  organization_id: string;
  role: string;
  account_roles!: {
    account_id: string;
    role: string;
  }[];
}

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
        // First get the organization role
        console.log('Querying organization role...');
        const { data: orgRoleData, error: orgRoleError } = await supabase
          .from('organization_roles')
          .select('organization_id, role')
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (orgRoleError) {
          console.error('Failed to fetch organization role:', orgRoleError);
          throw orgRoleError;
        }

        if (!orgRoleData) {
          console.log('No organization role found');
          return null;
        }

        // Then get the account role using the organization_id
        console.log('Querying account role...');
        const { data: accRoleData, error: accRoleError } = await supabase
          .from('account_roles')
          .select('account_id, role')
          .eq('user_id', session.user.id)
          .eq('organization_id', orgRoleData.organization_id)
          .maybeSingle();

        if (accRoleError) {
          console.error('Failed to fetch account role:', accRoleError);
          throw accRoleError;
        }

        if (!accRoleData) {
          console.log('No account role found');
          return null;
        }

        console.log('Found organization and account data:', {
          organizationId: orgRoleData.organization_id,
          accountId: accRoleData.account_id,
          orgRole: orgRoleData.role,
          accountRole: accRoleData.role
        });

        return {
          organizationId: orgRoleData.organization_id,
          accountId: accRoleData.account_id,
          orgRole: orgRoleData.role,
          accountRole: accRoleData.role
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
