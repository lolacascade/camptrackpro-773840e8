import { useState, useMemo } from 'react';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function useDataTableState<T>(initialData: T[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [localData, setLocalData] = useState<T[]>(initialData);

  const filteredAndSortedData = useMemo(() => {
    let result = [...localData];

    if (searchTerm) {
      result = result.filter((item) => {
        return Object.entries(item).some(([key, value]) => {
          if (typeof value === 'object' || Array.isArray(value)) {
            if (value && 'name' in value) {
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

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    sortConfig,
    setSortConfig,
    localData,
    setLocalData,
    filteredAndSortedData
  };
}