
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database } from "@/integrations/supabase/types";

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

export function applyQueryOptions<T>(
  query: PostgrestFilterBuilder<any, any>,
  options: QueryOptions,
  searchColumns?: string[]
): PostgrestFilterBuilder<any, any> {
  const { page = 1, pageSize = 25, sortBy, sortDirection = 'desc', searchTerm } = options;

  // Apply search
  if (searchTerm && searchColumns?.length) {
    query = query.or(searchColumns.map(col => `${col}.ilike.%${searchTerm}%`).join(','));
  }

  // Apply sorting
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortDirection === 'asc' });
  }

  // Apply pagination
  query = query.range((page - 1) * pageSize, page * pageSize - 1);

  return query;
}
