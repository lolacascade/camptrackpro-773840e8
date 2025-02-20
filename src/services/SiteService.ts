
import { FilteringService, FilterOptions } from "./base/FilteringService";
import { Site } from "@/types/site";

interface SiteFilterOptions extends FilterOptions {
  status?: string;
}

export class SiteService extends FilteringService {
  constructor() {
    super('sites');
  }

  async getSites(options: SiteFilterOptions = {}) {
    const {
      searchTerm,
      page,
      pageSize = 25,
      sortBy = 'created_at',
      sortDirection = 'desc',
      status
    } = options;

    let query = this.getBaseQuery().select('*');

    if (status) {
      query = query.eq('status', status);
    }

    if (searchTerm) {
      query = query.or(`
        name.ilike.%${searchTerm}%,
        location.ilike.%${searchTerm}%
      `);
    }

    query = this.applySorting(query, sortBy, sortDirection);
    query = this.applyPagination(query, page, pageSize);

    const { data, error, count } = await query.select('*', { count: 'exact' });

    if (error) {
      throw error;
    }

    return {
      data: data as Site[],
      total: count || 0,
      page,
      pageSize
    };
  }

  async getSiteById(id: string) {
    const { data, error } = await this.getBaseQuery()
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Site;
  }
}

export const siteService = new SiteService();
