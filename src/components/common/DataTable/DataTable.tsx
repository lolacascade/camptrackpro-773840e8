import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { useTableState } from "@/hooks/use-table-state";
import { useDataTable } from "@/hooks/use-data-table";
import { useDataSearch } from "@/hooks/use-data-search";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableContent } from "./DataTableContent";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableProps } from "./types";

export function DataTable<T extends { id?: number | string }>({
  data = [],
  columns,
  onViewDetails,
  onEdit,
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
  onRowClick,
}: DataTableProps<T>) {
  const {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    visibleColumns,
    setVisibleColumns,
    visibleColumnsData,
    handleFilterChange
  } = useDataTable({ 
    data: data || [],
    columns: columns || [],
    filters: filters || []
  });

  const {
    localData,
    setLocalData,
    sortConfig: localSortConfig,
    handleSort
  } = useTableState<T>(data || []);

  // Apply search filter
  const searchFilteredData = useDataSearch(localData, searchTerm);

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
            setLocalData(prev => [...(prev || []), payload.new as T]);
          } else if (payload.eventType === 'DELETE') {
            setLocalData(prev => (prev || []).filter(item => item.id !== payload.old.id));
          } else if (payload.eventType === 'UPDATE') {
            setLocalData(prev => 
              (prev || []).map(item => 
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
          filters={filters.map(filter => ({
            ...filter,
            onChange: (value: string) => handleFilterChange(filter.name, value)
          }))}
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

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = searchFilteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(searchFilteredData.length / itemsPerPage);

  return (
    <div className="space-y-4">
      <DataTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title={title}
        filters={filters.map(filter => ({
          ...filter,
          onChange: (value: string) => handleFilterChange(filter.name, value)
        }))}
        showTodayOnly={showTodayOnly}
        onShowTodayChange={onShowTodayChange}
        columns={columns}
        onColumnVisibilityChange={setVisibleColumns}
      />

      <DataTableContent
        data={paginatedData}
        columns={visibleColumnsData}
        sortConfig={localSortConfig}
        onSort={handleSort}
        onViewDetails={onViewDetails}
        onEdit={onEdit}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}