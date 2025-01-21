import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { AssetTable } from "@/components/assets/AssetTable";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { Asset } from "@/types/asset";
import { AssetStatsCards } from "@/components/assets/insights/AssetStatsCards";
import { AssetsHeader } from "@/components/assets/AssetsHeader";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";

export default function Assets() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const session = useSession();

  const { data: assets = [], isLoading } = useQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      if (!session?.user?.id) {
        throw new Error("No authenticated user");
      }

      const { data, error } = await supabase
        .from('assets')
        .select(`
          *,
          customers(id, first_name, last_name),
          slots(id, name, dock)
        `)
        .eq('user_id', session.user.id);
      
      if (error) throw error;
      return data as Asset[];
    },
    enabled: !!session?.user?.id,
  });

  const handleAddAsset = () => {
    setSelectedCustomerId(null);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (asset: Asset) => {
    // Implement view details functionality if needed
    console.log('View details:', asset);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
    setSelectedCustomerId(null);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold text-[#133134]">Assets</h1>
            <Button 
              onClick={handleAddAsset}
              className="bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
            >
              <Plus className="mr-2 h-4 w-4" /> New Asset
            </Button>
          </div>

          <AssetStatsCards />
          <AssetTable 
            assets={assets} 
            onViewDetails={handleViewDetails}
          />

          <AssetDrawer
            open={isDrawerOpen}
            onClose={handleDrawerClose}
            onAssetAdded={() => {
              // This will trigger a refetch via React Query invalidation
            }}
            customerId={selectedCustomerId}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}