import { useState, useMemo } from 'react';
import { Column } from '@/components/common/DataTable/types';

interface UseDataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  filters?: {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function useDataTable<T>({ data, columns, filters }: UseDataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    columns.map(col => col.accessorKey as string)
  );

  const visibleColumnsData = useMemo(() => 
    columns.filter(col => visibleColumns.includes(col.accessorKey as string)),
    [columns, visibleColumns]
  );

  const handleFilterChange = (filterName: string, value: string) => {
    console.log('Filter changing in hook:', filterName, value);
    const filter = filters?.find(f => f.name === filterName);
    if (filter) {
      filter.onChange(value);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    currentPage,
    setCurrentPage,
    visibleColumns,
    setVisibleColumns,
    visibleColumnsData,
    handleFilterChange
  };
}