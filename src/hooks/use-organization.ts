
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useOrganization() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-context'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        navigate('/signin');
        return null;
      }

      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (orgError) {
        toast.error("Failed to fetch organization context");
        return null;
      }

      if (!orgRoles?.organization_id) {
        return null;
      }

      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (accError) {
        toast.error("Failed to fetch account context");
        return null;
      }

      if (!accRoles?.account_id) {
        return null;
      }

      return {
        organizationId: orgRoles.organization_id,
        accountId: accRoles.account_id
      };
    },
    retry: false
  });

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    isLoading,
    error
  };
}
