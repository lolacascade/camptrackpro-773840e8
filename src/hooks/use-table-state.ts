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

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        if (current.direction === 'asc') {
          return { key, direction: 'desc' };
        }
        return null;
      }
      return { key, direction: 'asc' };
    });

    setLocalData(current => {
      const sorted = [...current].sort((a, b) => {
        const aValue = getNestedValue(a, key);
        const bValue = getNestedValue(b, key);
        
        if (sortConfig?.direction === 'asc') {
          return compareValues(bValue, aValue);
        }
        return compareValues(aValue, bValue);
      });
      return sorted;
    });
  };

  const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, part) => {
      if (acc === null || acc === undefined) return '';
      return acc[part];
    }, obj);
  };

  const compareValues = (a: any, b: any): number => {
    // Handle null/undefined values
    if (a === null || a === undefined) return 1;
    if (b === null || b === undefined) return -1;
    if (a === b) return 0;

    // Handle dates
    const dateA = new Date(a);
    const dateB = new Date(b);
    if (!isNaN(dateA.getTime()) && !isNaN(dateB.getTime())) {
      return dateA.getTime() - dateB.getTime();
    }

    // Handle numbers
    if (typeof a === 'number' && typeof b === 'number') {
      return a - b;
    }

    // Default string comparison
    return String(a).localeCompare(String(b));
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    sortConfig,
    setSortConfig,
    handleSort,
    localData,
    setLocalData,
  };
}