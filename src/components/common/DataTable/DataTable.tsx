import React, { useState } from "react";
import { DataTableCore } from "./DataTableCore";
import { DataTableHeader } from "./DataTableHeader";
import { DataTablePagination } from "./DataTablePagination";
import { useDataTable } from "./useDataTable";

interface FilterOption {
  label: string;
  value: string;
}

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (item: T) => void;
  onViewDetails?: (item: T) => void;
  title?: string;
  headerContent?: React.ReactNode;
  itemsPerPage?: number;
  isLoading?: boolean;
  filters?: {
    name: string;
    options: FilterOption[];
    value: string;
    onChange: (value: string) => void;
  }[];
}

export function DataTable<T extends { id?: number | string }>({
  data,
  columns,
  onEdit,
  onViewDetails,
  title,
  headerContent,
  itemsPerPage = 10,
  isLoading = false,
  filters = []
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const {
    paginatedData,
    totalPages,
    currentPage,
    setCurrentPage,
    handleSort
  } = useDataTable({
    data,
    searchTerm,
    itemsPerPage
  });

  return (
    <div>
      <DataTableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        title={title}
        filters={filters}
      >
        {headerContent}
      </DataTableHeader>

      <DataTableCore
        data={paginatedData}
        columns={columns}
        onEdit={onEdit}
        onViewDetails={onViewDetails}
        isLoading={isLoading}
      />

      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}