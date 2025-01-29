import { Skeleton } from "@/components/ui/skeleton";
import { DataTableHeader } from "../DataTableHeader";
import { Column } from "../types";

interface DataTableLoadingProps<T> {
  title?: string;
  columns: Column<T>[];
  filters?: any[];
  showTodayOnly?: boolean;
  onShowTodayChange?: (checked: boolean) => void;
  onColumnVisibilityChange: (columns: string[]) => void;
}

export function DataTableLoading<T>({
  title,
  columns,
  filters = [],
  showTodayOnly,
  onShowTodayChange,
  onColumnVisibilityChange
}: DataTableLoadingProps<T>) {
  return (
    <div className="space-y-4">
      <DataTableHeader
        searchTerm=""
        onSearchChange={() => {}}
        title={title}
        filters={filters}
        showTodayOnly={showTodayOnly}
        onShowTodayChange={onShowTodayChange}
        columns={columns}
        onColumnVisibilityChange={onColumnVisibilityChange}
      />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}