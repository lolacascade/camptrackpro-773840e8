
import { useState } from "react";
import { DataTableContent } from "./DataTableContent";
import { DataTableHeader } from "./DataTableHeader";
import { Column } from "./types";
import { DataTableContainer } from "./components/DataTableContainer";
import { DataTableLoading } from "./components/DataTableLoading";
import { useDataSearch } from "@/hooks/use-data-search";
import { useDataTable } from "@/hooks/use-data-table";

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  filters?: {
    name: string;
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
  }[];
  tableName?: string;
  onRowClick?: (row: T) => void;
  searchFields?: string[];
}

export function DataTable<T extends { id?: number | string }>({
  data,
  columns,
  isLoading,
  filters,
  tableName,
  onRowClick,
  searchFields,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  const filteredData = useDataSearch(data, searchTerm, searchFields);

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' };
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      return null;
    });
  };

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortConfig) return 0;

    const aValue = (a as any)[sortConfig.key];
    const bValue = (b as any)[sortConfig.key];

    if (aValue === bValue) return 0;
    if (aValue === null) return 1;
    if (bValue === null) return -1;

    const modifier = sortConfig.direction === 'asc' ? 1 : -1;
    return aValue < bValue ? -1 * modifier : 1 * modifier;
  });

  if (isLoading) {
    return (
      <DataTableLoading
        columns={columns}
        filters={filters}
      />
    );
  }

  return (
    <DataTableContainer>
      <div className="space-y-4">
        <DataTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filters={filters}
        />
        
        <DataTableContent
          data={sortedData}
          columns={columns}
          sortConfig={sortConfig}
          onSort={handleSort}
          onRowClick={onRowClick}
        />
      </div>
    </DataTableContainer>
  );
}
