
import { DataTable } from "@/components/common/DataTable/DataTable";
import { RV } from "@/types/rv";
import { getRVColumns } from "./RVTableColumns";

interface RVTableProps {
  rvs: RV[];
  onEdit: (rv: RV) => void;
  onViewDetails: (rv: RV) => void;
  isLoading: boolean;
}

export function RVTable({ rvs, onEdit, onViewDetails, isLoading }: RVTableProps) {
  return (
    <DataTable
      data={rvs}
      columns={getRVColumns()}
      isLoading={isLoading}
      onRowClick={onViewDetails}
    />
  );
}
