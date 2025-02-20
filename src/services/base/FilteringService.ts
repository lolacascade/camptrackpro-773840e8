
import { supabase } from "@/integrations/supabase/client";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

export interface FilterOptions {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export class FilteringService {
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  protected getBaseQuery() {
    return supabase.from(this.tableName).select();
  }

  protected applyPagination(
    query: PostgrestFilterBuilder<any, any, any>,
    page = 1,
    pageSize = 10
  ) {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    return query.range(start, end);
  }

  protected applySearch(
    query: PostgrestFilterBuilder<any, any, any>,
    searchTerm: string,
    searchColumns: string[]
  ) {
    if (!searchTerm || !searchColumns.length) return query;

    const searchConditions = searchColumns.map(
      column => `${column}.ilike.%${searchTerm}%`
    );
    return query.or(searchConditions.join(','));
  }

  protected applySorting(
    query: PostgrestFilterBuilder<any, any, any>,
    sortBy?: string,
    sortDirection: 'asc' | 'desc' = 'asc'
  ) {
    if (!sortBy) return query;
    return query.order(sortBy, { ascending: sortDirection === 'asc' });
  }
}
