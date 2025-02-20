
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Tables } from "@/types/database/tables";

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

export function applyQueryOptions<T extends keyof Tables>(
  query: PostgrestFilterBuilder<Tables, Tables[T], any>,
  options: QueryOptions,
  searchColumns?: (keyof Tables[T])[]
): PostgrestFilterBuilder<Tables, Tables[T], any> {
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
