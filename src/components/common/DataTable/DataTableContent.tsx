import { Table } from "@/components/ui/table";
import { DataTableHeaderRow } from "./DataTableHeaderRow";
import { DataTableBody } from "./DataTableBody";
import { Column } from "./types";

interface DataTableContentProps<T> {
  data: T[];
  columns: Column<T>[];
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  onSort: (key: string) => void;
  onViewDetails?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onRowClick?: (item: T) => void;
}

export function DataTableContent<T extends { id?: number | string }>({
  data,
  columns,
  sortConfig,
  onSort,
  onViewDetails,
  onEdit,
  onDelete,
  onRowClick,
}: DataTableContentProps<T>) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <DataTableHeaderRow
          columns={columns}
          sortConfig={sortConfig}
          onSort={onSort}
        />
        <DataTableBody
          data={data}
          columns={columns}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />
      </Table>
    </div>
  );
}