
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

// Define the exact shape of our query response
interface UserAccountResponse {
  account_id: string;
  accounts: {
    organization_id: string;
  } | null;
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
        // Query user_accounts and join with accounts to get organization_id
        console.log('Querying user account data...');
        const { data: accountData, error: queryError } = await supabase
          .from('user_accounts')
          .select(`
            account_id,
            accounts (
              organization_id
            )
          `)
          .eq('user_id', session.user.id)
          .maybeSingle();

        if (queryError) {
          console.error('Failed to fetch account data:', queryError);
          throw queryError;
        }

        if (!accountData) {
          console.log('No account found for user');
          return null;
        }

        if (!accountData.accounts) {
          console.log('No organization data found for account');
          return null;
        }

        console.log('Found account and organization data:', {
          organizationId: accountData.accounts.organization_id,
          accountId: accountData.account_id
        });

        return {
          organizationId: accountData.accounts.organization_id,
          accountId: accountData.account_id,
          // Since we no longer have explicit roles, defaulting to null
          orgRole: null,
          accountRole: null
        };
      } catch (error) {
        console.error('Error fetching account data:', error);
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
