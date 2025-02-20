
import { Database } from "@/integrations/supabase/types";

export type Tables = Database['public']['Tables'];
export type TableName = keyof Tables;

export type Row<T extends TableName> = Tables[T]['Row'];
export type Insert<T extends TableName> = Tables[T]['Insert'];
export type Update<T extends TableName> = Tables[T]['Update'];

export interface TableQueryOptions {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  searchTerm?: string;
  filters?: Record<string, any>;
}

export interface QueryResultMetadata {
  page: number;
  pageSize: number;
  total: number;
}

export interface QueryResult<T> extends QueryResultMetadata {
  data: T[];
}

export interface ServiceContext {
  organizationId?: string;
  accountId?: string;
}
