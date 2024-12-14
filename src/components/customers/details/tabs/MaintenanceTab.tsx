import { Maintenance } from "@/types/maintenance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";

interface MaintenanceTabProps {
  maintenanceRequests: Maintenance[];
  isLoading: boolean;
}

export function MaintenanceTab({ maintenanceRequests, isLoading }: MaintenanceTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          data={maintenanceRequests || []}
          columns={[
            { header: "Description", accessorKey: "description" },
            { header: "Status", accessorKey: "status" },
            { header: "Priority", accessorKey: "priority" },
            {
              header: "Created",
              accessorKey: "created_at",
              cell: (item) => new Date(item.created_at).toLocaleDateString()
            }
          ]}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}