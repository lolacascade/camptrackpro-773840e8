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

  const getNestedValue = (obj: any, path: string) => {
    const value = path.split('.').reduce((acc, part) => {
      if (acc && typeof acc === 'object' && part in acc) {
        return acc[part];
      }
      if (acc && Array.isArray(acc) && acc.length > 0) {
        return acc[0][part];
      }
      return null;
    }, obj);
    
    return value === null || value === undefined ? '' : value;
  };

  const compareValues = (a: any, b: any): number => {
    if (a === b) return 0;
    if (a === null || a === undefined) return 1;
    if (b === null || b === undefined) return -1;

    if (typeof a === 'string' && typeof b === 'string') {
      return a.localeCompare(b);
    }

    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    // Convert to strings for comparison if types don't match
    return String(a).localeCompare(String(b));
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...localData];

    // Filter based on search term
    if (searchTerm) {
      result = result.filter((item) => {
        return Object.entries(item).some(([key, value]) => {
          const stringValue = getNestedValue(item, key);
          return String(stringValue).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Sort if sortConfig is set
    if (sortConfig) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, sortConfig.key);
        const bValue = getNestedValue(b, sortConfig.key);
        
        const comparison = compareValues(aValue, bValue);
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