
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { GenericSchema, Tables } from "@/types/database/tables";

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  searchTerm?: string;
}

export interface QueryResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type TableName = keyof Tables;

export function applyQueryOptions<T extends TableName>(
  query: PostgrestFilterBuilder<GenericSchema, Tables[T]['Row'], unknown>,
  options: QueryOptions,
  searchColumns?: (keyof Tables[T]['Row'])[]
): PostgrestFilterBuilder<GenericSchema, Tables[T]['Row'], unknown> {
  const { page = 1, pageSize = 25, sortBy, sortDirection = 'desc', searchTerm } = options;

  // Apply search if search term and columns are provided
  if (searchTerm && searchColumns?.length) {
    const searchConditions = searchColumns.map(col => `${String(col)}.ilike.%${searchTerm}%`);
    query = query.or(searchConditions.join(','));
  }

  // Apply sorting if sort column is provided
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortDirection === 'asc' });
  }

  // Apply pagination
  const start = (page - 1) * pageSize;
  query = query.range(start, start + pageSize - 1);

  return query;
}

export interface ServiceError {
  message: string;
  code?: string;
  details?: unknown;
}
