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
  
  // Initialize table state with the provided data
  const {
    localData,
    setLocalData,
    sortConfig: localSortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
  } = useTableState<T>(data);

  // Calculate pagination indices
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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

  // Apply search filter to sorted data
  const searchFilteredData = useDataSearch(localData || [], searchTerm);

  // Update localData when data prop changes
  useEffect(() => {
    console.log('Data prop changed:', data);
    if (data && data.length > 0) {
      setLocalData(data);
    }
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
        (payload) => {
          console.log('Received real-time update:', payload);
          
          setLocalData(currentData => {
            if (!currentData) return data;

            switch (payload.eventType) {
              case 'INSERT':
                return [...currentData, payload.new as T];
              case 'DELETE':
                return currentData.filter(item => item.id !== payload.old.id);
              case 'UPDATE':
                return currentData.map(item => 
                  item.id === payload.new.id ? { ...item, ...payload.new } : item
                );
              default:
                return currentData;
            }
          });
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