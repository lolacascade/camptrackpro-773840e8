
import { supabase } from "@/integrations/supabase/client";
import { Asset } from "@/types/asset";
import { QueryOptions, QueryResult, applyQueryOptions, ServiceError } from "./utils/queryUtils";

export interface AssetQueryOptions extends QueryOptions {
  status?: string;
  type?: string;
}

class AssetService {
  private tableName = 'rvs';

  async getAssets(options: AssetQueryOptions = {}): Promise<QueryResult<Asset>> {
    try {
      let query = supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customers(*),
          site:sites(*)
        `, { count: 'exact' });

      query = applyQueryOptions(query, options, ['make', 'model']);

      if (options.status) {
        query = query.eq('status', options.status);
      }

      if (options.type) {
        query = query.eq('asset_type', options.type);
      }

      const { data, error, count } = await query;

      if (error) throw new ServiceError('Failed to fetch assets', error);

      return {
        data: data as Asset[],
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch assets', error);
    }
  }

  async getAssetById(id: string): Promise<Asset> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select(`
          *,
          customer:customers(*),
          site:sites(*)
        `)
        .eq('id', id)
        .maybeSingle();

      if (error) throw new ServiceError('Failed to fetch asset', error);
      if (!data) throw new ServiceError('Asset not found');

      return data as Asset;
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch asset', error);
    }
  }
}

export const assetService = new AssetService();
