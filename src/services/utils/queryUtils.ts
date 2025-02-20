
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database } from "@/types/database/tables";

export type TableName = keyof Database["Tables"];
export type Row<T extends TableName> = Database["Tables"][T]["Row"];

export const applyPagination = (
  query: PostgrestFilterBuilder<Database, any, any>,
  page: number,
  pageSize: number
): PostgrestFilterBuilder<Database, any, any> => {
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  return query.range(start, end);
};

export const applySorting = (
  query: PostgrestFilterBuilder<Database, any, any>,
  sortField: string,
  sortDirection: 'asc' | 'desc'
): PostgrestFilterBuilder<Database, any, any> => {
  return query.order(sortField, { ascending: sortDirection === 'asc' });
};

export interface QueryOptions {
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}

export interface QueryResult<T> {
  data: T[];
  total: number;
}
