
import { FilteringService, FilterOptions } from "./base/FilteringService";
import { Customer } from "@/types/customer";

interface CustomerFilterOptions extends FilterOptions {
  // Add any customer-specific filter options here
}

export class CustomerService extends FilteringService {
  constructor() {
    super('customers');
  }

  async getCustomers(options: CustomerFilterOptions = {}) {
    const {
      searchTerm,
      page,
      pageSize = 25,
      sortBy = 'created_at',
      sortDirection = 'desc'
    } = options;

    let query = this.getBaseQuery();

    if (searchTerm) {
      query = this.applySearch(query, searchTerm, ['first_name', 'last_name', 'email']);
    }

    query = this.applySorting(query, sortBy, sortDirection);
    query = this.applyPagination(query, page, pageSize);

    const { data, error, count } = await query.select('*', { count: 'exact' });

    if (error) {
      throw error;
    }

    return {
      data: data as Customer[],
      total: count || 0,
      page,
      pageSize
    };
  }

  async getCustomerById(id: string) {
    const { data, error } = await this.getBaseQuery()
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw error;
    }

    return data as Customer;
  }
}

export const customerService = new CustomerService();
