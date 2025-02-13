
import { useState } from "react";
import { DataTableContent } from "./DataTableContent";
import { DataTableHeader } from "./DataTableHeader";
import { Column } from "./types";
import { DataTableContainer } from "./components/DataTableContainer";
import { DataTableLoading } from "./components/DataTableLoading";
import { useDataSearch } from "@/hooks/use-data-search";
import { DataTableRowActions } from "./DataTableRowActions";
import { DataTablePagination } from "./DataTablePagination";
import { DateRange } from "react-day-picker";
import { isWithinInterval } from "date-fns";

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
  searchFields?: string[];
  title?: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void>;
  onViewDetails?: (row: T) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  itemsPerPage?: number;
  dateRange?: DateRange;
  dateField?: keyof T;
}

export function DataTable<T extends { id?: number | string }>({
  data,
  columns,
  isLoading,
  filters,
  tableName,
  onRowClick,
  searchFields,
  title,
  onEdit,
  onDelete,
  onViewDetails,
  currentPage = 1,
  onPageChange,
  itemsPerPage = 25,
  dateRange,
  dateField
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  // First apply search filter
  const searchFilteredData = useDataSearch(data, searchTerm, searchFields);

  // Then apply date filter if both dateRange and dateField are provided
  const dateFilteredData = dateRange && dateField
    ? searchFilteredData.filter(item => {
        const itemDate = new Date((item[dateField] as string));
        return dateRange.from && dateRange.to && 
               isWithinInterval(itemDate, { 
                 start: dateRange.from, 
                 end: dateRange.to 
               });
      })
    : searchFilteredData;

  // Sort the filtered data
  const sortedData = [...dateFilteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];

    if (aValue === bValue) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    const modifier = sortConfig.direction === 'asc' ? 1 : -1;
    return aValue < bValue ? -1 * modifier : 1 * modifier;
  });

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

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
          onSearchChange={setSearchTerm}
          filters={filters}
          title={title}
        />
        
        <DataTableContent
          data={paginatedData}
          columns={columnsWithActions}
          sortConfig={sortConfig}
          onSort={handleSort}
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
