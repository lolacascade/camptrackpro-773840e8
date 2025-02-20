
import { supabase } from "@/integrations/supabase/client";
import { Site } from "@/types/site";
import { QueryOptions, QueryResult, applyQueryOptions, ServiceError } from "./utils/queryUtils";

export interface SiteQueryOptions extends QueryOptions {
  status?: 'available' | 'occupied' | 'maintenance';
}

class SiteService {
  private tableName = 'sites';

  async getSites(options: SiteQueryOptions = {}): Promise<QueryResult<Site>> {
    try {
      let query = supabase
        .from(this.tableName)
        .select('*', { count: 'exact' });

      query = applyQueryOptions(query, options, ['name', 'location']);

      if (options.status) {
        query = query.eq('status', options.status);
      }

      const { data, error, count } = await query;

      if (error) throw new ServiceError('Failed to fetch sites', error);

      return {
        data: data as Site[],
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch sites', error);
    }
  }

  async getSiteById(id: string): Promise<Site> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw new ServiceError('Failed to fetch site', error);
      if (!data) throw new ServiceError('Site not found');

      return data as Site;
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch site', error);
    }
  }
}

export const siteService = new SiteService();
