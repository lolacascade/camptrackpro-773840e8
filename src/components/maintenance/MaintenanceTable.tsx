
import { DataTable } from "@/components/common/DataTable/DataTable";
import { maintenanceColumns } from "./table/MaintenanceColumns";
import type { Maintenance } from "@/types/maintenance";
import { useNavigate } from "react-router-dom";
import { useOrganization } from "@/hooks/use-organization";

interface MaintenanceTableProps {
  maintenanceRequests: Maintenance[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

export function MaintenanceTable({
  maintenanceRequests,
  statusFilter,
  setStatusFilter
}: MaintenanceTableProps) {
  const navigate = useNavigate();
  const { organizationId, accountId, isLoading } = useOrganization();

  if (!organizationId || !accountId) {
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Loading organization context...</p>
      </div>
    );
  }

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

  const handleRowClick = (maintenance: Maintenance) => {
    navigate(`/app/maintenance/${maintenance.id}`);
  };

  return (
    <DataTable
      data={maintenanceRequests || []}
      columns={maintenanceColumns}
      onRowClick={handleRowClick}
      filters={filters}
      tableName="maintenance"
      isLoading={isLoading}
    />
  );
}
