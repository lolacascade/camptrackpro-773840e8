
import { supabase } from "@/integrations/supabase/client";
import { Asset } from "@/types/asset";
import { FilteringService, FilterConfig } from "./base/FilteringService";
import { Database } from "@/types/database/tables";

export class AssetService extends FilteringService {
  async list(organizationId: string, filters: FilterConfig[] = []): Promise<Asset[]> {
    let query = supabase
      .from('rvs')
      .select(`
        *,
        site:sites (
          id,
          name
        )
      `)
      .eq('organization_id', organizationId);

    query = this.applyFilters('rvs', query, filters);

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch assets: ${error.message}`);
    }

    return data as Asset[];
  }

  async get(id: string): Promise<Asset> {
    const { data, error } = await supabase
      .from('rvs')
      .select(`
        *,
        site:sites (
          id,
          name
        )
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch asset: ${error.message}`);
    }

    return data as Asset;
  }
}

export const assetService = new AssetService();
