import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AssetDrawer } from "@/components/assets/AssetDrawer";
import { AddAssetDialog } from "@/components/assets/AddAssetDialog";
import { Asset } from "@/types/asset";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { DataTable, Column } from "@/components/common/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { PageContainer } from "@/components/layout/PageContainer";

export default function Assets() {
  const { toast } = useToast();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");

  const { data: assets = [], isLoading, refetch } = useQuery({
    queryKey: ['assets', typeFilter, customerFilter],
    queryFn: async () => {
      try {
        let query = supabase
          .from('assets')
          .select(`
            id,
            asset_name,
            asset_size,
            asset_type,
            customer_id,
            slots (
              id,
              name,
              dock
            ),
            customers (
              id,
              name
            )
          `);

        if (typeFilter !== 'all') {
          query = query.eq('asset_type', typeFilter);
        }

        if (customerFilter !== 'all') {
          query = query.eq('customer_id', customerFilter);
        }

        const { data, error } = await query;

        if (error) {
          console.error('Error fetching assets:', error);
          throw error;
        }

        return (data || []).map(item => ({
          id: item.id,
          asset_name: item.asset_name,
          asset_size: item.asset_size,
          customer_id: item.customer_id,
          asset_type: item.asset_type || 'boat',
          slots: item.slots,
          customers: item.customers
        })) as Asset[];
      } catch (error) {
        console.error('Error fetching assets:', error);
        toast({
          title: "Error",
          description: "Failed to load assets.",
          variant: "destructive",
        });
        return [];
      }
    },
  });

  const columns: Column<Asset>[] = [
    {
      header: "Asset Name",
      accessorKey: "asset_name",
      sortable: true,
    },
    {
      header: "Size",
      accessorKey: "asset_size",
      sortable: true,
    },
    {
      header: "Type",
      accessorKey: "asset_type",
      cell: (asset) => (
        <Badge variant="secondary">
          {asset.asset_type || 'Unspecified'}
        </Badge>
      ),
      sortable: true,
    },
    {
      header: "Customer",
      accessorKey: "customers",
      cell: (asset) => asset.customers?.name || 'Unassigned',
      sortable: true,
    },
    {
      header: "Slot",
      accessorKey: "slots",
      cell: (asset) => asset.slots?.name || 'Unassigned',
      sortable: true,
    },
  ];

  const filters = [
    {
      name: "type",
      options: [
        { label: "All Types", value: "all" },
        { label: "Boat", value: "boat" },
        { label: "Jet Ski", value: "jet-ski" },
        { label: "Yacht", value: "yacht" }
      ],
      value: typeFilter,
      onChange: setTypeFilter
    },
    {
      name: "customer",
      options: [
        { label: "All Customers", value: "all" },
        ...(assets?.map(asset => ({
          label: asset.customers?.name || 'Unassigned',
          value: String(asset.customer_id || 'unassigned')
        })) || [])
      ],
      value: customerFilter,
      onChange: setCustomerFilter
    }
  ];

  const handleEdit = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  const handleViewDetails = (asset: Asset) => {
    setSelectedAsset(asset);
    setIsDrawerOpen(true);
  };

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-[#133134]">Assets</h1>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Asset
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <DataTable
              data={assets}
              columns={columns}
              onEdit={handleEdit}
              onViewDetails={handleViewDetails}
              filters={filters}
            />
          )}

          <AddAssetDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            onAssetAdded={refetch}
          />

          <AssetDrawer
            asset={selectedAsset}
            open={isDrawerOpen}
            onClose={() => {
              setIsDrawerOpen(false);
              setSelectedAsset(null);
            }}
            onAssetUpdated={refetch}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}