import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit2, ExternalLink } from "lucide-react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import { useState, useMemo } from "react";

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

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onViewDetails?: (item: T) => void;
  title?: string;
  searchPlaceholder?: string;
  headerContent?: React.ReactNode;
  itemsPerPage?: number;
  filters?: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function DataTable<T extends { id?: number | string }>({ 
  data,
  columns,
  onEdit,
  onViewDetails,
  title,
  headerContent,
  itemsPerPage = 10,
  filters = []
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key: keyof T) => {
    setSortConfig((current) => ({
      key,
      direction:
        current?.key === key && current.direction === "asc" ? "desc" : "asc",
    }));
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Filter based on search term
    if (searchTerm) {
      result = result.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Sort if sortConfig is set
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue === null) return 1;
        if (bValue === null) return -1;
        if (aValue === bValue) return 0;

        const comparison = aValue < bValue ? -1 : 1;
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [data, searchTerm, sortConfig]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <DataTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title={title}
        filters={filters}
      >
        {headerContent}
      </DataTableHeader>

      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className="text-[#133134]">
                <div className="flex items-center gap-2">
                  {column.header}
                  {column.sortable && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 data-[state=sorted]:bg-muted"
                      onClick={() => handleSort(column.accessorKey)}
                    >
                      <ArrowUpDown className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </TableHead>
            ))}
            {(onEdit || onViewDetails) && (
              <TableHead className="text-[#133134]">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (onEdit || onViewDetails ? 1 : 0)}
                className="text-center py-4"
              >
                No items found
              </TableCell>
            </TableRow>
          ) : (
            paginatedData.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column, index) => (
                  <TableCell key={index}>
                    {column.cell
                      ? column.cell(item)
                      : String(item[column.accessorKey] || "")}
                  </TableCell>
                ))}
                {(onEdit || onViewDetails) && (
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

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}