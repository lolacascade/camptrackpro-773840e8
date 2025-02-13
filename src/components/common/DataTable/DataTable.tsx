
import { DataTableContent } from "./DataTableContent";
import { DataTableHeader } from "./DataTableHeader";
import { Column } from "./types";
import { DataTableContainer } from "./components/DataTableContainer";
import { DataTableLoading } from "./components/DataTableLoading";
import { DataTableRowActions } from "./DataTableRowActions";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  filters?: {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
  tableName?: string;
  onRowClick?: (row: T) => void;
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  title?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void>;
  onViewDetails?: (row: T) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
}

export function DataTable<T extends { id?: number | string }>({
  data,
  columns,
  isLoading,
  filters,
  tableName,
  onRowClick,
  searchTerm = "",
  onSearchChange,
  title,
  onEdit,
  onDelete,
  onViewDetails,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  itemsPerPage = 25,
}: DataTableProps<T>) {
  const getActionsColumn = (): Column<T> => ({
    header: "Actions",
    accessorKey: "actions",
    cell: (item: T) => (
      <DataTableRowActions 
        row={item}
        onEdit={onEdit}
        onDelete={onDelete}
        onViewDetails={onViewDetails}
      />
    ),
  });

  const columnsWithActions = onEdit || onDelete || onViewDetails
    ? [...columns, getActionsColumn()]
    : columns;

  if (isLoading) {
    return (
      <DataTableLoading
        columns={columnsWithActions}
        filters={filters}
        title={title}
      />
    );
  }

  return (
    <DataTableContainer>
      <div className="space-y-4">
        <DataTableHeader
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          filters={filters}
          title={title}
        />
        
        <DataTableContent
          data={data}
          columns={columnsWithActions}
          onRowClick={onRowClick}
        />

        {totalPages > 1 && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange || ((page) => {})}
          />
        )}
      </div>
    </DataTableContainer>
  );
}
