
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database } from "@/types/database/tables";

export type TableName = keyof Database["Tables"];
export type Row<T extends TableName> = Database["Tables"][T]["Row"];

export const applyPagination = <T extends TableName>(
  query: PostgrestFilterBuilder<Database, Row<T>, unknown>,
  page: number,
  pageSize: number
): PostgrestFilterBuilder<Database, Row<T>, unknown> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  return query.range(start, end);
};

export const applySorting = <T extends TableName>(
  query: PostgrestFilterBuilder<Database, Row<T>, unknown>,
  sortField: keyof Row<T>,
  sortDirection: 'asc' | 'desc'
): PostgrestFilterBuilder<Database, Row<T>, unknown> => {
  return query.order(sortField as string, { ascending: sortDirection === 'asc' });
};
