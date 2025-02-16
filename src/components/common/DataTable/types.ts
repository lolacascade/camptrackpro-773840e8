
import { ReactNode } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface Filter {
  name: string;
  options: ReadonlyArray<FilterOption> | Array<FilterOption>;
  value: string;
  onChange: (value: string) => void;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

export interface Column<T> {
  header: string;
  accessorKey: string;
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
  title?: string;
  isLoading?: boolean;
  filters?: Filter[];
  tableName?: string;
  onRowClick?: (row: T) => void;
  searchFields?: string[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => Promise<void>;
  onViewDetails?: (row: T) => void;
  itemsPerPage?: number;
  dateRange?: DateRange;
}

export interface DataTableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  title?: string;
  filters?: Filter[];
}

export interface DataTableLoadingProps<T> {
  columns: Column<T>[];
  filters?: Filter[];
  title?: string;
}
