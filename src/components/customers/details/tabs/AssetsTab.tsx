import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";

interface AssetsTabProps {
  assets: any[];
  isLoading: boolean;
}

export function AssetsTab({ assets, isLoading }: AssetsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Assets</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={assets || []}
          columns={[
            { header: "Name", accessorKey: "asset_name" },
            { header: "Type", accessorKey: "asset_type" },
            { header: "Size", accessorKey: "asset_size" }
          ]}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}