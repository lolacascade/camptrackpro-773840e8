import { useState, useEffect } from 'react';
import { Column } from '../types';

interface UseDataTableStateProps<T> {
  data: T[];
  itemsPerPage?: number;
  tableName?: string;
  organizationId?: string;
  accountId?: string;
}

export function useDataTableState<T>({ 
  data, 
  itemsPerPage = 10,
  tableName,
  organizationId,
  accountId 
}: UseDataTableStateProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Update localData when data prop changes
  useEffect(() => {
    setLocalData(data);
  }, [data]);

  // Calculate pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return {
    localData,
    setLocalData,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    startIndex,
    endIndex,
    itemsPerPage
  };
}