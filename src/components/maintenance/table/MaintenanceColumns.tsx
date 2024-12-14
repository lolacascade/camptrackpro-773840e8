import { Badge } from "@/components/ui/badge";
import type { Column } from "@/components/common/DataTable/types";
import type { Maintenance } from "@/types/maintenance";

export const maintenanceColumns: Column<Maintenance>[] = [
  {
    header: "Description",
    accessorKey: "description",
    sortable: true,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (maintenance) => (
      <Badge variant={
        maintenance.status === 'completed' ? 'default' :
        maintenance.status === 'in_progress' ? 'secondary' :
        'outline'
      }>
        {maintenance.status.replace('_', ' ')}
      </Badge>
    ),
    sortable: true,
  },
  {
    header: "Created",
    accessorKey: "created_at",
    cell: (maintenance) => new Date(maintenance.created_at).toLocaleDateString(),
    sortable: true,
  },
  {
    header: "Updated",
    accessorKey: "updated_at",
    cell: (maintenance) => maintenance.updated_at ? new Date(maintenance.updated_at).toLocaleDateString() : '-',
    sortable: true,
  }
];