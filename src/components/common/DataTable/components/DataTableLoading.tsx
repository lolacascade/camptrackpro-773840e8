
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableHeader } from "../DataTableHeader";
import { Column } from "../types";

interface DataTableLoadingProps<T> {
  title?: string;
  columns: Column<T>[];
  filters?: any[];
}

export function DataTableLoading<T>({
  title,
  columns,
  filters = [],
}: DataTableLoadingProps<T>) {
  return (
    <div className="space-y-4">
      <DataTableHeader
        searchTerm=""
        onSearchChange={() => {}}
        title={title}
        filters={filters}
      />
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
