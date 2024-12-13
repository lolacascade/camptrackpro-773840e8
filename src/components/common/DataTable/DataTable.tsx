import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableColumns } from "./DataTableColumns";
import { DataTableRowActions } from "./DataTableRowActions";
import { useState, useMemo, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";

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
  onEdit?: (item: T) => void;
  onDuplicate?: (item: T) => void;
  onDelete?: (item: T) => void;
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
  tableName?: string; // For real-time updates
}

export function DataTable<T extends { id?: number | string }>({ 
  data,
  columns,
  onViewDetails,
  onEdit,
  onDuplicate,
  onDelete,
  title,
  headerContent,
  itemsPerPage = 10,
  isLoading = false,
  filters = [],
  sortConfig,
  onSort,
  showTodayOnly,
  onShowTodayChange,
  tableName
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.accessorKey as string)
  );
  const [localData, setLocalData] = useState<T[]>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Real-time updates
  useEffect(() => {
    if (!tableName) return;

    const channel = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName
        },
        (payload) => {
          console.log('Change received!', payload);
          // Update local data based on the change
          if (payload.eventType === 'INSERT') {
            setLocalData(prev => [...prev, payload.new as T]);
          } else if (payload.eventType === 'DELETE') {
            setLocalData(prev => prev.filter(item => item.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setLocalData(prev => 
              prev.map(item => 
                item.id === payload.new.id ? { ...item, ...payload.new } : item
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [tableName]);

  const filteredAndSortedData = useMemo(() => {
    let result = [...localData];

    if (searchTerm) {
      result = result.filter((item) => {
        // Search through all values in the item
        return Object.entries(item).some(([key, value]) => {
          // Skip searching through complex objects or arrays
          if (typeof value === 'object' || Array.isArray(value)) {
            if (value && 'name' in value) {
              // If the object has a name property, search through it
              return String(value.name).toLowerCase().includes(searchTerm.toLowerCase());
            }
            return false;
          }
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
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
  }, [localData, searchTerm, sortConfig]);

  const visibleColumnsData = columns.filter(
    col => visibleColumns.includes(col.accessorKey as string)
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
    <div className="space-y-4">
      <div className="flex items-center justify-between">
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
        <DataTableColumns 
          columns={columns}
          onColumnVisibilityChange={setVisibleColumns}
        />
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumnsData.map((column, index) => (
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
              <TableHead className="text-[#133134]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={visibleColumnsData.length + 1}
                  className="text-center py-4"
                >
                  No items found
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedData.map((item) => (
                <TableRow 
                  key={item.id}
                  className="group transition-all hover:shadow-md"
                >
                  {visibleColumnsData.map((column, index) => (
                    <TableCell key={index}>
                      {column.cell
                        ? column.cell(item)
                        : String(item[column.accessorKey] || "")}
                    </TableCell>
                  ))}
                  <TableCell>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <DataTableRowActions
                        row={item}
                        onEdit={onEdit}
                        onViewDetails={onViewDetails}
                        onDuplicate={onDuplicate}
                        onDelete={onDelete}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredAndSortedData.length / itemsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}