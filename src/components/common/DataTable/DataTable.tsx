import { DataTableHeader } from "./DataTableHeader";
import { DataTableContent } from "./DataTableContent";
import { DataTablePagination } from "./DataTablePagination";
import { DataTableProps } from "./types";
import { DataTableContainer } from "./components/DataTableContainer";
import { DataTableLoading } from "./components/DataTableLoading";
import { useDataTableCore } from "./hooks/useDataTableCore";

export function DataTable<T extends { id?: number | string }>({
  data = [],
  columns,
  onViewDetails,
  onEdit,
  onDelete,
  title,
  itemsPerPage = 10,
  isLoading = false,
  filters = [],
  sortConfig: externalSortConfig,
  onSort: externalOnSort,
  showTodayOnly,
  onShowTodayChange,
  tableName,
  onRowClick,
}: DataTableProps<T>) {
  const {
    organizationId,
    accountId,
    sortConfig,
    handleSort,
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchTerm,
    visibleColumns,
    setVisibleColumns,
    visibleColumnsData,
    handleFilterChange,
    paginatedData,
    totalPages,
  } = useDataTableCore({
    data,
    columns,
    filters,
    itemsPerPage,
    tableName,
  });

  if (!organizationId || !accountId) {
    return (
      <DataTableContainer>
        <div className="text-center text-gray-500">
          Please ensure you have an organization and account selected
        </div>
      </DataTableContainer>
    );
  }

  if (isLoading) {
    return (
      <DataTableLoading
        title={title}
        columns={columns}
        filters={filters}
        showTodayOnly={showTodayOnly}
        onShowTodayChange={onShowTodayChange}
        onColumnVisibilityChange={setVisibleColumns}
      />
    );
  }

  return (
    <DataTableContainer>
      <div className="space-y-4">
        <DataTableHeader
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          title={title}
          filters={filters.map(filter => ({
            ...filter,
            onChange: (value: string) => handleFilterChange(filter.name, value)
          }))}
          showTodayOnly={showTodayOnly}
          onShowTodayChange={onShowTodayChange}
          columns={columns}
          onColumnVisibilityChange={setVisibleColumns}
        />

        <DataTableContent
          data={paginatedData}
          columns={visibleColumnsData}
          sortConfig={sortConfig}
          onSort={handleSort}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
          onRowClick={onRowClick}
        />

        <DataTablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </DataTableContainer>
  );
}