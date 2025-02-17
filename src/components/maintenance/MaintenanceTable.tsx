
import { DataTable } from "@/components/common/DataTable/DataTable";
import { maintenanceColumns } from "./table/MaintenanceColumns";
import type { Maintenance } from "@/types/maintenance";

interface MaintenanceTableProps {
  maintenanceRequests: Maintenance[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  filterOptions: ReadonlyArray<{ label: string; value: string; }>;
  onRowClick: (maintenance: Maintenance) => void;
}

export function MaintenanceTable({
  maintenanceRequests,
  statusFilter,
  setStatusFilter,
  filterOptions,
  onRowClick
}: MaintenanceTableProps) {
  const filters = [
    {
      name: "status",
      options: [...filterOptions],
      value: statusFilter,
      onChange: setStatusFilter
    }
  ];

  return (
    <DataTable
      data={maintenanceRequests}
      columns={maintenanceColumns}
      onRowClick={onRowClick}
      filters={filters}
      tableName="maintenance"
    />
  );
}
