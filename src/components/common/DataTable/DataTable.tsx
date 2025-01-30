import { useEffect } from "react";
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
import { DataTableContainer } from "./components/DataTableContainer";
import { DataTableLoading } from "./components/DataTableLoading";
import { useDataTableState } from "./hooks/useDataTableState";

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
  const {
    localData,
    setLocalData,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    startIndex,
    endIndex
  } = useDataTableState({ 
    data, 
    itemsPerPage, 
    tableName, 
    organizationId, 
    accountId 
  });

  const {
    visibleColumns,
    setVisibleColumns,
    visibleColumnsData,
    handleFilterChange
  } = useDataTable({ 
    data: localData || [], 
    columns: columns || [], 
    filters: filters || [] 
  });

  const {
    localData: sortedData,
    sortConfig: localSortConfig,
    handleSort
  } = useTableState<T>(localData || []);

  // Apply search filter
  const searchFilteredData = useDataSearch(sortedData, searchTerm);

  // Update localData when data prop changes
  useEffect(() => {
    console.log('Data prop changed:', data);
    setLocalData(data);
  }, [data, setLocalData]);

  // Real-time updates
  useEffect(() => {
    if (!tableName || !organizationId || !accountId) return;

    console.log('Setting up real-time subscription for:', tableName);
    const channel = supabase
      .channel('table_db_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: tableName,
          filter: `organization_id=eq.${organizationId} AND account_id=eq.${accountId}`
        },
        async (payload) => {
          console.log('Received real-time update:', payload);
          try {
            setLocalData(currentData => {
              if (!currentData) return data;

              if (payload.eventType === 'INSERT') {
                return [...currentData, payload.new as T];
              } else if (payload.eventType === 'DELETE') {
                return currentData.filter(item => item.id !== payload.old.id);
              } else if (payload.eventType === 'UPDATE') {
                return currentData.map(item => 
                  item.id === payload.new.id ? { ...item, ...payload.new } : item
                );
              }
              return currentData;
            });
          } catch (error) {
            console.error('Error handling real-time update:', error);
            toast.error('Error updating data. Please refresh the page.');
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up real-time subscription');
      supabase.removeChannel(channel);
    };
  }, [tableName, organizationId, accountId, setLocalData, data]);

  if (!organizationId || !accountId) {
    return (
      <DataTableContainer>
        <div className="text-center text-gray-500">
          Please ensure you have an organization and account selected
        </div>
      </DataTableContainer>
    );
  }

  if (isLoading) {
    return (
      <DataTableLoading
        title={title}
        columns={columns}
        filters={filters}
        showTodayOnly={showTodayOnly}
        onShowTodayChange={onShowTodayChange}
        onColumnVisibilityChange={setVisibleColumns}
      />
    );
  }

  const paginatedData = searchFilteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(searchFilteredData.length / itemsPerPage);

  return (
    <DataTableContainer>
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
    </DataTableContainer>
  );
}