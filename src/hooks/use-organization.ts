
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useOrganization() {
  const navigate = useNavigate();
  const { session } = useAuth(); // Use the session from AuthContext instead

  const { data, isLoading, error } = useQuery({
    queryKey: ['organization-context', session?.user?.id],
    queryFn: async () => {
      if (!session?.user) {
        console.log("No session found");
        return null;
      }

      console.log("Current user ID:", session.user.id);

      // First check organization roles
      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id, role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (orgError) {
        console.error("Error fetching organization roles:", orgError);
        return null;
      }

      console.log("Organization role data:", orgRoles);

      if (!orgRoles?.organization_id) {
        console.log("No organization_id found for user");
        return null;
      }

      // Then check account roles
      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id, role')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (accError) {
        console.error("Error fetching account roles:", accError);
        return null;
      }

      console.log("Account role data:", accRoles);

      if (!accRoles?.account_id) {
        console.log("No account_id found for user");
        return null;
      }

      const result = {
        organizationId: orgRoles.organization_id,
        accountId: accRoles.account_id
      };

      console.log("Returning organization context:", result);
      return result;
    },
    enabled: !!session?.user?.id,
    staleTime: 30000, // Cache for 30 seconds
    retry: false
  });

  if (error) {
    console.error("useOrganization hook error:", error);
  }

  return {
    organizationId: data?.organizationId,
    accountId: data?.accountId,
    isLoading,
    error
  };
}
