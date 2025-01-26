import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTableState } from "@/hooks/use-table-state";
import { useDataTable } from "@/hooks/use-data-table";
import { useDataSearch } from "@/hooks/use-data-search";
import { useOrganization } from "@/hooks/use-organization";
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
  const { organizationId, accountId } = useOrganization();
  console.log('DataTable received data:', data);
  console.log('DataTable received tableName:', tableName);
  console.log('Organization ID:', organizationId);
  console.log('Account ID:', accountId);

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

  // Update localData when data prop changes
  useEffect(() => {
    setLocalData(data);
  }, [data, setLocalData]);

  // Apply search filter
  const searchFilteredData = useDataSearch(localData, searchTerm);
  console.log('Filtered data length:', searchFilteredData.length);

  // Real-time updates with organization and account filtering
  useEffect(() => {
    if (!tableName || !organizationId || !accountId) return;

    console.log('Setting up real-time subscription for table:', tableName);
    const channel = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
          filter: organizationId && accountId 
            ? `organization_id=eq.${organizationId} AND account_id=eq.${accountId}`
            : undefined
        },
        async (payload) => {
          console.log('Change received!', payload);
          try {
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
          } catch (error) {
            console.error('Error handling real-time update:', error);
            toast.error('Error updating data. Please refresh the page.');
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up subscription for table:', tableName);
      supabase.removeChannel(channel);
    };
  }, [tableName, organizationId, accountId, setLocalData]);

  if (!organizationId || !accountId) {
    return (
      <div className="text-center py-4 text-gray-500">
        Unable to load data. Please check your organization settings.
      </div>
    );
  }

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

  console.log('Paginated data length:', paginatedData.length);
  console.log('Total pages:', totalPages);

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