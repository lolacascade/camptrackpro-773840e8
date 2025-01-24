import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function useOrganization() {
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [accountId, setAccountId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserContext() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user's organization role
      const { data: orgRole } = await supabase
        .from('organization_roles')
        .select('organization_id')
        .eq('user_id', user.id)
        .single();

      if (orgRole) {
        setOrganizationId(orgRole.organization_id);
        
        // Get user's account role
        const { data: accRole } = await supabase
          .from('account_roles')
          .select('account_id')
          .eq('user_id', user.id)
          .single();
        
        if (accRole) {
          setAccountId(accRole.account_id);
        }
      }
    }

    fetchUserContext();
  }, []);

  return { organizationId, accountId };
}