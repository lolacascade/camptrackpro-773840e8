import { Table } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableHeaderRow } from "./DataTableHeaderRow";
import { DataTableBody } from "./DataTableBody";
import { DataTablePagination } from "./DataTablePagination";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useTableState } from "@/hooks/use-table-state";
import { DataTableProps } from "./types";

export function DataTable<T extends { id?: number | string }>({
  data,
  columns,
  onViewDetails,
  onEdit,
  onDuplicate,
  onDelete,
  title,
  itemsPerPage = 10,
  isLoading = false,
  filters = [],
  sortConfig,
  onSort,
  showTodayOnly,
  onShowTodayChange,
  tableName,
}: DataTableProps<T>) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.accessorKey as string)
  );

  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    localData,
    setLocalData,
    filteredAndSortedData,
    sortConfig: localSortConfig,
    handleSort
  } = useTableState<T>(data);

  useEffect(() => {
    setLocalData(data);
  }, [data, setLocalData]);

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
  }, [tableName, setLocalData]);

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
          columns={columns}
          onColumnVisibilityChange={setVisibleColumns}
        />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  const visibleColumnsData = columns.filter(
    col => visibleColumns.includes(col.accessorKey as string)
  );

  return (
    <div className="space-y-4">
      <DataTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title={title}
        filters={filters}
        showTodayOnly={showTodayOnly}
        onShowTodayChange={onShowTodayChange}
        columns={columns}
        onColumnVisibilityChange={setVisibleColumns}
      />

      <div className="rounded-md border bg-white">
        <Table>
          <DataTableHeaderRow
            columns={visibleColumnsData}
            sortConfig={localSortConfig}
            onSort={handleSort}
          />
          <DataTableBody
            data={filteredAndSortedData}
            columns={visibleColumnsData}
            onViewDetails={onViewDetails}
            onEdit={onEdit}
            onDuplicate={onDuplicate}
            onDelete={onDelete}
          />
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