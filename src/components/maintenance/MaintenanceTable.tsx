
import { DataTable } from "@/components/common/DataTable/DataTable";
import { maintenanceColumns } from "./table/MaintenanceColumns";
import type { Maintenance } from "@/types/maintenance";
import { useNavigate } from "react-router-dom";

interface MaintenanceTableProps {
  maintenanceRequests: Maintenance[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  filterOptions: readonly { label: string; value: string; }[];
}

export function MaintenanceTable({
  maintenanceRequests,
  statusFilter,
  setStatusFilter,
  filterOptions
}: MaintenanceTableProps) {
  const navigate = useNavigate();

  const filters = [
    {
      name: "status",
      options: filterOptions,
      value: statusFilter,
      onChange: setStatusFilter
    }
  ];

  const handleRowClick = (maintenance: Maintenance) => {
    navigate(`/app/maintenance/${maintenance.id}`);
  };

  return (
    <DataTable
      data={maintenanceRequests}
      columns={maintenanceColumns}
      onRowClick={handleRowClick}
      filters={filters}
      tableName="maintenance"
    />
  );
}
