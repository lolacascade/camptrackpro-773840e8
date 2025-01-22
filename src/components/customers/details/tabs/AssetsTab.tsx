import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { Asset } from "@/types/asset";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";

interface AssetsTabProps {
  customer: Customer;
}

export function AssetsTab({ customer }: AssetsTabProps) {
  const { data: assets, isLoading } = useQuery({
    queryKey: ['customer-assets', customer.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('assets')
        .select('*')
        .eq('customer_id', customer.id);

      if (error) throw error;
      return data as Asset[];
    }
  });

  const columns = [
    {
      header: "Asset Name",
      accessorKey: "asset_name",
      sortable: true,
    },
    {
      header: "Type",
      accessorKey: "asset_type",
      cell: (asset: Asset) => (
        <Badge variant="secondary">
          {asset.asset_type || 'Unspecified'}
        </Badge>
      ),
      sortable: true,
    },
    {
      header: "Size",
      accessorKey: "asset_size",
      sortable: true,
    },
    {
      header: "Status",
      accessorKey: "status",
      sortable: true,
    }
  ];

  return (
    <DataTable
      data={assets || []}
      columns={columns}
      isLoading={isLoading}
      tableName="customer-assets"
    />
  );
}