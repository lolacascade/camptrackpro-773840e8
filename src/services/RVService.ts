
import { FilteringService, FilterOptions } from "./base/FilteringService";
import { Asset } from "@/types/asset";

interface RVFilterOptions extends FilterOptions {
  status?: string;
}

export class RVService extends FilteringService {
  constructor() {
    super('rvs');
  }

  async getRVs(options: RVFilterOptions = {}) {
    const {
      searchTerm,
      page,
      pageSize = 25,
      sortBy = 'created_at',
      sortDirection = 'desc',
      status
    } = options;

    let query = this.getBaseQuery()
      .select(`
        *,
        customer:customers(*),
        site:sites(*)
      `);

    if (status) {
      query = query.eq('status', status);
    }

    if (searchTerm) {
      query = query.or(`
        make.ilike.%${searchTerm}%,
        model.ilike.%${searchTerm}%
      `);
    }

    query = this.applySorting(query, sortBy, sortDirection);
    query = this.applyPagination(query, page, pageSize);

    const { data, error, count } = await query.select('*', { count: 'exact' });

    if (error) {
      throw error;
    }

    return {
      data: data as Asset[],
      total: count || 0,
      page,
      pageSize
    };
  }

  async getRVById(id: string) {
    const { data, error } = await this.getBaseQuery()
      .select(`
        *,
        customer:customers(*),
        site:sites(*)
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Asset;
  }
}

export const rvService = new RVService();
