
import { DataTable } from "@/components/common/DataTable/DataTable";
import { maintenanceColumns } from "./table/MaintenanceColumns";
import type { Maintenance } from "@/types/maintenance";

interface MaintenanceTableProps {
  maintenanceRequests: Maintenance[];
  onEdit: (maintenance: Maintenance) => void;
  onViewDetails: (maintenance: Maintenance) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function MaintenanceTable({
  maintenanceRequests,
  onEdit,
  onViewDetails,
  statusFilter,
  setStatusFilter
}: MaintenanceTableProps) {
  const filters = [
    {
      name: "status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "In Progress", value: "in_progress" },
        { label: "Completed", value: "completed" }
      ],
      value: statusFilter,
      onChange: setStatusFilter
    }
  ];

  return (
    <DataTable
      data={maintenanceRequests}
      columns={maintenanceColumns}
      onEdit={onEdit}
      onViewDetails={onViewDetails}
      filters={filters}
      tableName="maintenance"
    />
  );
}
