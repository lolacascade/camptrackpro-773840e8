
import { Table } from "@/components/ui/table";
import { DataTableHeaderRow } from "./DataTableHeaderRow";
import { DataTableBody } from "./DataTableBody";
import { Column } from "./types";

interface DataTableContentProps<T> {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
}

export function DataTableContent<T extends { id?: number | string }>({
  data,
  columns,
  onRowClick,
}: DataTableContentProps<T>) {
  return (
    <div className="rounded-md border bg-white">
      <Table>
        <DataTableHeaderRow columns={columns} />
        <DataTableBody
          data={data}
          columns={columns}
          onRowClick={onRowClick}
        />
      </Table>
    </div>
  );
}
