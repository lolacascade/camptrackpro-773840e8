
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { QueryOptions, QueryResult, applyQueryOptions, ServiceError } from "./utils/queryUtils";

export interface CustomerQueryOptions extends QueryOptions {
  status?: string;
}

class CustomerService {
  private tableName = 'customers';

  async getCustomers(options: CustomerQueryOptions = {}): Promise<QueryResult<Customer>> {
    try {
      let query = supabase
        .from(this.tableName)
        .select('*', { count: 'exact' });

      query = applyQueryOptions(query, options, ['first_name', 'last_name', 'email']);

      if (options.status) {
        query = query.eq('status', options.status);
      }

      const { data, error, count } = await query;

      if (error) throw new ServiceError('Failed to fetch customers', error);

      return {
        data: data as Customer[],
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch customers', error);
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw new ServiceError('Failed to fetch customer', error);
      if (!data) throw new ServiceError('Customer not found');

      return data as Customer;
    } catch (error) {
      throw error instanceof ServiceError ? error : new ServiceError('Failed to fetch customer', error);
    }
  }
}

export const customerService = new CustomerService();
