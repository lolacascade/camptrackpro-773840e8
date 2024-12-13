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
    // Handle nested paths like 'customer.name' or 'slot.name'
    return path.split('.').reduce((acc, part) => {
      if (acc === null || acc === undefined) return '';
      
      // Handle array access
      if (Array.isArray(acc)) {
        return acc.map(item => item[part]).join(', ');
      }
      
      // Handle object access
      if (typeof acc === 'object' && part in acc) {
        return acc[part];
      }
      
      return '';
    }, obj);
  };

  const compareValues = (a: any, b: any): number => {
    // Handle null/undefined values
    if (a === null || a === undefined) return 1;
    if (b === null || b === undefined) return -1;
    if (a === b) return 0;

    // Convert dates to timestamps for comparison
    if (a instanceof Date && b instanceof Date) {
      return a.getTime() - b.getTime();
    }

    // Try to parse dates from strings
    if (typeof a === 'string' && typeof b === 'string') {
      const dateA = new Date(a);
      const dateB = new Date(b);
      if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
        return dateA.getTime() - dateB.getTime();
      }
    }

    // Handle numbers
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    // Default string comparison
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