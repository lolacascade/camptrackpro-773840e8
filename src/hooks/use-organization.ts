
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

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

        if (!accountData || !accountData.accounts) {
          console.log('No account or organization found for user');
          // Only redirect if we're not already on a public route and not in loading state
          if (!isPublicRoute && !isLoading) {
            toast.error("No account found. Please sign in again.");
            // Sign out the user and redirect to signin
            await signOut();
            navigate('/signin', { replace: true });
          }
          return null;
        }

        console.log('Found account and organization data:', {
          organizationId: accountData.accounts.organization_id,
          accountId: accountData.account_id
        });

        return {
          organizationId: accountData.accounts.organization_id,
          accountId: accountData.account_id,
          orgRole: null,
          accountRole: null
        };
      } catch (error) {
        console.error('Error fetching account data:', error);
        if (!isPublicRoute) {
          toast.error("Unable to fetch account data. Please try signing in again.");
          await signOut();
          navigate('/signin', { replace: true });
        }
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
