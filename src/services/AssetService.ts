
import { supabase } from "@/integrations/supabase/client";
import { Asset } from "@/types/asset";
import { FilteringService, FilterConfig } from "./base/FilteringService";

export class AssetService extends FilteringService {
  async list(organizationId: string, filters: FilterConfig[] = []): Promise<Asset[]> {
    let query = supabase
      .from('rvs')
      .select(`
        *,
        site:sites (
          id,
          name,
          location
        )
      `)
      .eq('organization_id', organizationId);

    if (filters.length > 0) {
      query = this.applyFilters(query, filters);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch assets: ${error.message}`);
    }

    return (data || []) as Asset[];
  }

  async get(id: string): Promise<Asset> {
    const { data, error } = await supabase
      .from('rvs')
      .select(`
        *,
        site:sites (
          id,
          name,
          location
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
