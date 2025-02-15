
import React, { createContext, useContext } from 'react';
import { Asset } from '@/types/asset';
import { useOrganization } from '@/hooks/use-organization';
import { useAssets } from '@/hooks/assets/use-assets';
import { useToast } from '@/hooks/use-toast';

interface AssetsContextType {
  assets: Asset[];
  isLoading: boolean;
  error: Error | null;
  refetchAssets: () => Promise<void>;
  organizationId: string | undefined;
  accountId: string | undefined;
}

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const { organizationId, accountId, isLoading: isLoadingOrg } = useOrganization();
  const { 
    data: assets = [], 
    isLoading: isLoadingAssets, 
    error: assetsError,
    refetch: refetchAssets 
  } = useAssets();
  
  const { toast } = useToast();

  // Error handling
  React.useEffect(() => {
    if (assetsError || (!organizationId && !isLoadingOrg)) {
      const errorMessage = assetsError 
        ? "Failed to load assets. Please try again." 
        : "No organization found. Please set up your organization first.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }, [assetsError, organizationId, isLoadingOrg, toast]);

  const value = {
    assets,
    isLoading: isLoadingOrg || isLoadingAssets,
    error: assetsError || null,
    refetchAssets,
    organizationId,
    accountId
  };

  return (
    <AssetsContext.Provider value={value}>
      {children}
    </AssetsContext.Provider>
  );
}

export const useAssetsContext = () => {
  const context = useContext(AssetsContext);
  if (context === undefined) {
    throw new Error('useAssetsContext must be used within an AssetsProvider');
  }
  return context;
};
