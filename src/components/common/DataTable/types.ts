import { ReactNode } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface Filter {
  name: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export interface Column<T> {
  header: string;
  accessorKey: string; // Allow nested paths like "customer.name"
  cell?: (item: T) => ReactNode;
  sortable?: boolean;
}

export interface SortConfig {
  key: string;
  direction: 'asc' | 'desc';
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onViewDetails?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  title?: string;
  itemsPerPage?: number;
  isLoading?: boolean;
  filters?: Filter[];
  sortConfig?: SortConfig;
  onSort?: (key: string) => void;
  showTodayOnly?: boolean;
  onShowTodayChange?: (checked: boolean) => void;
  tableName?: string;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  onRowClick?: (row: T) => void;
}