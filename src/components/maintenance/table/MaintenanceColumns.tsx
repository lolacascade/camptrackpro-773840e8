
import { Badge } from "@/components/ui/badge";
import type { Column } from "@/components/common/DataTable/types";
import type { Maintenance } from "@/types/maintenance";
import { format } from "date-fns";

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
    header: "Priority",
    accessorKey: "priority",
    cell: (maintenance) => (
      <Badge variant={
        maintenance.priority === 'high' ? 'destructive' :
        maintenance.priority === 'medium' ? 'secondary' :
        'outline'
      }>
        {maintenance.priority}
      </Badge>
    ),
    sortable: true,
  },
  {
    header: "Site",
    accessorKey: "site_id",
    cell: (maintenance) => maintenance.site?.name || '-',
    sortable: true,
  },
  {
    header: "Created",
    accessorKey: "created_at",
    cell: (maintenance) => maintenance.created_at ? format(new Date(maintenance.created_at), 'MMM dd, yyyy') : '-',
    sortable: true,
  },
  {
    header: "Updated",
    accessorKey: "updated_at",
    cell: (maintenance) => maintenance.updated_at ? format(new Date(maintenance.updated_at), 'MMM dd, yyyy') : '-',
    sortable: true,
  }
];
