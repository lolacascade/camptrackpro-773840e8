
import React, { createContext, useContext } from 'react';
import { Asset } from '@/types/asset';
import { useOrganization } from '@/hooks/use-organization';
import { useAssets } from '@/hooks/assets/use-assets';
import { useToast } from '@/hooks/use-toast';

interface AssetsContextType {
  assets: Asset[];
  isLoading: boolean;
  error: Error | null;
  refetchAssets: () => Promise<any>;
  organizationId: string | undefined;
  accountId: string | undefined;
}

const AssetsContext = createContext<AssetsContextType | undefined>(undefined);

export function AssetsProvider({ children }: { children: React.ReactNode }) {
  const { organizationId, accountId } = useOrganization();
  const { 
    data: assets = [], 
    isLoading: isLoadingAssets, 
    error: assetsError,
    refetch: refetchAssets 
  } = useAssets();
  
  const { toast } = useToast();

  // Error handling
  React.useEffect(() => {
    if (assetsError) {
      toast({
        title: "Error",
        description: "Failed to load assets. Please try again.",
        variant: "destructive",
      });
    }
  }, [assetsError, toast]);

  const value = {
    assets,
    isLoading: isLoadingAssets,
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
