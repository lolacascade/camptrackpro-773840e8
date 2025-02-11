
import { Table } from "@/components/ui/table";
import { DataTableHeaderRow } from "./DataTableHeaderRow";
import { DataTableBody } from "./DataTableBody";
import { Column, SortConfig } from "./types";

interface DataTableContentProps<T> {
  data: T[];
  columns: Column<T>[];
  sortConfig: SortConfig | null;
  onSort: (key: string) => void;
  onRowClick?: (item: T) => void;
}

export function DataTableContent<T extends { id?: number | string }>({
  data,
  columns,
  sortConfig,
  onSort,
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
          onRowClick={onRowClick}
        />
      </Table>
    </div>
  );
}
