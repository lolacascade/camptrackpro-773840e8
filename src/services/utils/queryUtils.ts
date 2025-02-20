
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database } from "@/integrations/supabase/types";

export interface QueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  searchTerm?: string;
}

export function applyQueryOptions<T extends keyof Database['public']['Tables']>(
  query: PostgrestFilterBuilder<Database['public']['Tables'], T>,
  options: QueryOptions,
  searchColumns?: string[]
) {
  const { page = 1, pageSize = 25, sortBy, sortDirection = 'desc', searchTerm } = options;

  // Apply search if searchTerm and searchColumns are provided
  if (searchTerm && searchColumns?.length) {
    const searchConditions = searchColumns.map(column => `${column}.ilike.%${searchTerm}%`);
    query = query.or(searchConditions.join(','));
  }

  // Apply sorting
  if (sortBy) {
    query = query.order(sortBy, { ascending: sortDirection === 'asc' });
  }

  // Apply pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize - 1;
  query = query.range(start, end);

  return query;
}

export interface QueryResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export class ServiceError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message);
    this.name = 'ServiceError';
  }
}
