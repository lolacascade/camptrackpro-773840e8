
import { DataTable } from "@/components/common/DataTable/DataTable";
import { maintenanceColumns } from "./table/MaintenanceColumns";
import type { Maintenance } from "@/types/maintenance";
import { useNavigate } from "react-router-dom";

interface MaintenanceTableProps {
  maintenanceRequests: Maintenance[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  filterOptions: ReadonlyArray<{ label: string; value: string; }> | Array<{ label: string; value: string; }>;
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
      options: [...filterOptions], // Convert readonly array to mutable array
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
