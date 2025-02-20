
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { Database } from "@/types/database/tables";

export type FilterConfig = {
  field: string;
  operator: string;
  value: any;
};

export abstract class FilteringService {
  protected applyFilters<T>(
    query: PostgrestFilterBuilder<Database, any, any>,
    filters: FilterConfig[]
  ): PostgrestFilterBuilder<Database, any, any> {
    filters.forEach((filter) => {
      const { field, operator, value } = filter;

      switch (operator) {
        case "eq":
          query = query.eq(field, value);
          break;
        case "neq":
          query = query.neq(field, value);
          break;
        case "gt":
          query = query.gt(field, value);
          break;
        case "gte":
          query = query.gte(field, value);
          break;
        case "lt":
          query = query.lt(field, value);
          break;
        case "lte":
          query = query.lte(field, value);
          break;
        case "in":
          query = query.in(field, value);
          break;
        case "contains":
          query = query.ilike(field, `%${value}%`);
          break;
        default:
          break;
      }
    });

    return query;
  }
}
