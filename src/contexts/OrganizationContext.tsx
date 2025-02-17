
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface OrganizationContextData {
  organizationId: string | null;
  accountId: string | null;
  orgRole: string | null;
  accountRole: string | null;
  isLoading: boolean;
  error: Error | null;
}

interface OrganizationContextType extends OrganizationContextData {
  refreshContext: () => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const { user, session, isLoading: isAuthLoading } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [organizationData, setOrganizationData] = useState<Omit<OrganizationContextData, 'isLoading' | 'error'>>({
    organizationId: null,
    accountId: null,
    orgRole: null,
    accountRole: null
  });

  const fetchOrganizationContext = async () => {
    try {
      if (!user?.id) {
        console.log('No user found in OrganizationProvider');
        setOrganizationData({
          organizationId: null,
          accountId: null,
          orgRole: null,
          accountRole: null
        });
        return;
      }

      console.log('Fetching organization context for user:', user.id);
      
      // Get organization role - should only be one per user
      const { data: orgRole, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id, role')
        .eq('user_id', user.id)
        .single();

      if (orgError) {
        console.error('Failed to fetch organization role:', orgError);
        throw new Error('Failed to fetch organization data');
      }

      if (!orgRole) {
        console.log('No organization role found');
        throw new Error('No organization access found');
      }

      // Get account role for this organization
      const { data: accRole, error: accError } = await supabase
        .from('account_roles')
        .select('account_id, role')
        .eq('user_id', user.id)
        .eq('organization_id', orgRole.organization_id)
        .single();

      if (accError) {
        console.error('Failed to fetch account role:', accError);
        throw new Error('Failed to fetch account data');
      }

      if (!accRole) {
        console.log('No account role found');
        throw new Error('No account access found');
      }

      console.log('Setting organization context:', {
        organizationId: orgRole.organization_id,
        accountId: accRole.account_id,
        orgRole: orgRole.role,
        accountRole: accRole.role
      });

      setOrganizationData({
        organizationId: orgRole.organization_id,
        accountId: accRole.account_id,
        orgRole: orgRole.role,
        accountRole: accRole.role
      });
      setError(null);
    } catch (err) {
      console.error('Error in fetchOrganizationContext:', err);
      setError(err as Error);
      setOrganizationData({
        organizationId: null,
        accountId: null,
        orgRole: null,
        accountRole: null
      });
      
      // Only redirect if we're not already on a public route
      const isPublicRoute = ['/signin', '/signup', '/reset-password'].includes(window.location.pathname);
      if (!isPublicRoute) {
        toast.error("Organization access error. Please sign in again.");
        navigate('/signin');
      }
    }
  };

  // Initial load when auth state changes
  useEffect(() => {
    if (!isAuthLoading) {
      setIsLoading(true);
      fetchOrganizationContext().finally(() => setIsLoading(false));
    }
  }, [user?.id, isAuthLoading]);

  const refreshContext = async () => {
    setIsLoading(true);
    await fetchOrganizationContext();
    setIsLoading(false);
  };

  const value = {
    ...organizationData,
    isLoading,
    error,
    refreshContext
  };

  return (
    <OrganizationContext.Provider value={value}>
      {children}
    </OrganizationContext.Provider>
  );
}

export function useOrganization() {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
}
