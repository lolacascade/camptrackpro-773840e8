
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

      console.log("Fetching organization context for user:", session.user.id);

      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (orgError) {
        console.error("Error fetching organization roles:", orgError);
        toast.error("Failed to fetch organization context");
        return null;
      }

      console.log("Organization roles:", orgRoles);

      if (!orgRoles?.organization_id) {
        console.log("No organization_id found in roles");
        return null;
      }

      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (accError) {
        console.error("Error fetching account roles:", accError);
        toast.error("Failed to fetch account context");
        return null;
      }

      console.log("Account roles:", accRoles);

      if (!accRoles?.account_id) {
        console.log("No account_id found in roles");
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
