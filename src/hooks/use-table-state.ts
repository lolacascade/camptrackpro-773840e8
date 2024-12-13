import { useState, useMemo } from 'react';

interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export function useTableState<T>(initialData: T[]) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [localData, setLocalData] = useState<T[]>(initialData);

  const filteredAndSortedData = useMemo(() => {
    let result = [...localData];

    // Filter based on search term
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

    // Sort if sortConfig is set
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;
        if (aValue === bValue) return 0;

        const comparison = compareValues(aValue, bValue);
        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [localData, searchTerm, sortConfig]);

  // Helper function to get nested object values
  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  };

  // Helper function to compare values of different types
  const compareValues = (a: any, b: any) => {
    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }
    return a < b ? -1 : 1;
  };

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