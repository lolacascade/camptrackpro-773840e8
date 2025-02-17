
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";

type OrganizationRoleRow = Database['public']['Tables']['organization_roles']['Row'];
type AccountRoleRow = Database['public']['Tables']['account_roles']['Row'];

interface OrganizationContextData {
  organizationId: string;
  accountId: string;
  orgRole: string;
  accountRole: string;
}

export function useOrganization() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isPublicRoute = ['/signin', '/signup', '/reset-password'].includes(location.pathname);

  const { data, isLoading, error } = useQuery<OrganizationContextData, Error>({
    queryKey: ['organization-context', session?.user?.id],
    queryFn: async () => {
      if (!session?.user) {
        console.log('No session found in useOrganization');
        throw new Error("No session found");
      }

      console.log('Fetching organization roles for user:', session.user.id);
      
      // First query: Get organization role
      const { data: orgData, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id, role')
        .eq('user_id', session.user.id)
        .single();

      console.log('Organization role response:', { orgData, error: orgError });

      if (orgError) {
        console.error('Failed to fetch organization data:', orgError);
        toast.error("Error loading organization data. Please try refreshing the page.");
        throw orgError;
      }

      if (!orgData) {
        console.log('No organization role found');
        if (!isPublicRoute) {
          toast.error("No organization access found. Please contact your administrator.");
          navigate('/signin', { replace: true });
        }
        throw new Error("No organization role found");
      }

      // Second query: Get account role
      const { data: accData, error: accError } = await supabase
        .from('account_roles')
        .select('account_id, role')
        .eq('user_id', session.user.id)
        .eq('organization_id', orgData.organization_id)
        .single();

      console.log('Account role response:', { accData, error: accError });

      if (accError) {
        console.error('Failed to fetch account data:', accError);
        toast.error("Error loading account data. Please try refreshing the page.");
        throw accError;
      }

      if (!accData) {
        console.log('No account role found');
        if (!isPublicRoute) {
          toast.error("No account access found. Please contact your administrator.");
          navigate('/signin', { replace: true });
        }
        throw new Error("No account role found");
      }

      const contextData: OrganizationContextData = {
        organizationId: orgData.organization_id,
        accountId: accData.account_id,
        orgRole: orgData.role,
        accountRole: accData.role
      };

      console.log('Organization context data:', contextData);
      return contextData;
    },
    enabled: !!session?.user?.id && !isPublicRoute,
    staleTime: 30000,
    retry: 1,
    meta: {
      onSettled: (data, error) => {
        if (error && !isPublicRoute) {
          console.error('Organization data fetch settled with error:', error);
          if (error.message !== "No organization or account roles found") {
            throw error;
          }
        }
      }
    }
  });

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    orgRole: data?.orgRole,
    accountRole: data?.accountRole,
    isLoading: isPublicRoute ? false : isLoading,
    error: isPublicRoute ? null : error
  };
}
