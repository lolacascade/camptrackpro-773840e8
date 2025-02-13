
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useTableState } from "@/hooks/use-table-state";
import { useDataTable } from "@/hooks/use-data-table";
import { useDataSearch } from "@/hooks/use-data-search";
import { useOrganization } from "@/hooks/use-organization";
import { Column } from "../types";

interface UseDataTableCoreProps<T> {
  data: T[];
  columns: Column<T>[];
  filters?: {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
  itemsPerPage?: number;
  tableName?: string;
  searchFields?: string[];
}

export function useDataTableCore<T extends { id?: number | string }>({
  data,
  columns,
  filters = [],
  itemsPerPage = 10,
  tableName,
  searchFields,
}: UseDataTableCoreProps<T>) {
  const { organizationId, accountId } = useOrganization();
  
  const {
    localData,
    setLocalData,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
  } = useTableState<T>(data);

  const {
    visibleColumns,
    setVisibleColumns,
    visibleColumnsData,
    handleFilterChange
  } = useDataTable({ 
    data: localData || [], 
    columns: columns || [], 
    filters: filters || [],
    searchFields
  });

  // Apply search filter to sorted data
  const searchFilteredData = useDataSearch(localData || [], searchTerm, searchFields);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = searchFilteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(searchFilteredData.length / itemsPerPage);

  // Update localData when data prop changes
  useEffect(() => {
    if (data && data.length > 0) {
      setLocalData(data);
    }
  }, [data, setLocalData]);

  // Real-time updates
  useEffect(() => {
    if (!tableName || !organizationId || !accountId) return;

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
      supabase.removeChannel(channel);
    };
  }, [tableName, organizationId, accountId, setLocalData, data]);

  return {
    organizationId,
    accountId,
    localData,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    visibleColumns,
    setVisibleColumns,
    visibleColumnsData,
    handleFilterChange,
    paginatedData,
    totalPages,
  };
}
