import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, ExternalLink, Edit2 } from "lucide-react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import { useState, useMemo } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface FilterOption {
  label: string;
  value: string;
}

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onViewDetails?: (item: T) => void;
  onEdit?: (item: T) => void;  // Added this prop
  title?: string;
  headerContent?: React.ReactNode;
  itemsPerPage?: number;
  isLoading?: boolean;
  filters?: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
  sortConfig?: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort?: (key: string) => void;
  showTodayOnly?: boolean;
  onShowTodayChange?: (checked: boolean) => void;
}

export function DataTable<T extends { id?: number | string }>({ 
  data,
  columns,
  onViewDetails,
  onEdit,  // Added this prop
  title,
  headerContent,
  itemsPerPage = 10,
  isLoading = false,
  filters = [],
  sortConfig,
  onSort,
  showTodayOnly,
  onShowTodayChange
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof T];
        const bValue = b[sortConfig.key as keyof T];

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        <DataTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          title={title}
          filters={filters}
          showTodayOnly={showTodayOnly}
          onShowTodayChange={onShowTodayChange}
        >
          {headerContent}
        </DataTableHeader>

        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <DataTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title={title}
        filters={filters}
        showTodayOnly={showTodayOnly}
        onShowTodayChange={onShowTodayChange}
      >
        {headerContent}
      </DataTableHeader>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead 
                  key={index} 
                  className="text-[#133134]"
                  onClick={() => column.sortable && onSort?.(column.accessorKey as string)}
                  style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortConfig?.key === column.accessorKey && (
                      <span className="inline-block">
                        {sortConfig.direction === 'asc' ? (
                          <ArrowUp className="h-4 w-4" />
                        ) : (
                          <ArrowDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              {(onViewDetails || onEdit) && (
                <TableHead className="text-[#133134]">Actions</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length + ((onViewDetails || onEdit) ? 1 : 0)}
                  className="text-center py-4"
                >
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item) => (
                <TableRow 
                  key={item.id}
                  className="transition-all hover:shadow-md"
                >
                  {columns.map((column, index) => (
                    <TableCell key={index}>
                      {column.cell
                        ? column.cell(item)
                        : String(item[column.accessorKey] || "")}
                    </TableCell>
                  ))}
                  {(onViewDetails || onEdit) && (
                    <TableCell>
                      <div className="flex gap-2">
                        {onEdit && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onEdit(item)}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        )}
                        {onViewDetails && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onViewDetails(item)}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}