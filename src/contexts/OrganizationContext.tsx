
import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from "@/contexts/AuthContext";
import { useOrganization as useOrganizationHook } from "@/hooks/use-organization";

interface OrganizationContextData {
  organizationId: string | null;
  accountId: string | null;
  orgRole: string | null;
  accountRole: string | null;
  isLoading: boolean;
  error: Error | null;
}

const OrganizationContext = createContext<OrganizationContextData | undefined>(undefined);

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const organizationData = useOrganizationHook();

  return (
    <OrganizationContext.Provider value={organizationData}>
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
