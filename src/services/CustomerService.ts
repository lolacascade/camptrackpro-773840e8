
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { QueryOptions, QueryResult, applyQueryOptions, ServiceErrorImpl } from "./utils/queryUtils";
import { Database } from "@/integrations/supabase/types";

export interface CustomerQueryOptions extends QueryOptions {
  status?: string;
}

type CustomerRow = Database['public']['Tables']['customers']['Row'];

class CustomerService {
  private tableName = 'customers' as const;

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

      if (error) {
        throw new ServiceErrorImpl(
          'Failed to fetch customers',
          'QUERY_ERROR',
          error.message,
          error
        );
      }

      if (!data) {
        return {
          data: [],
          total: 0,
          page: options.page || 1,
          pageSize: options.pageSize || 25
        };
      }

      // Transform the raw database rows to match the Customer type
      const customers: Customer[] = data.map((row: CustomerRow) => ({
        id: row.id,
        first_name: row.first_name,
        last_name: row.last_name,
        email: row.email || '',
        phone: row.phone || '',
        created_at: row.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString() // Add the missing updated_at field
      }));

      return {
        data: customers,
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      console.error('CustomerService.getCustomers error:', error);
      throw error instanceof ServiceErrorImpl 
        ? error 
        : new ServiceErrorImpl(
            'Failed to fetch customers',
            'UNEXPECTED_ERROR',
            error instanceof Error ? error.message : 'Unknown error',
            error
          );
    }
  }

  async getCustomerById(id: string): Promise<Customer> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) {
        throw new ServiceErrorImpl(
          'Failed to fetch customer',
          'QUERY_ERROR',
          error.message,
          error
        );
      }

      if (!data) {
        throw new ServiceErrorImpl(
          'Customer not found',
          'NOT_FOUND',
          `No customer found with id: ${id}`
        );
      }

      // Transform the raw database row to match the Customer type
      return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email || '',
        phone: data.phone || '',
        created_at: data.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString() // Add the missing updated_at field
      };
    } catch (error) {
      console.error('CustomerService.getCustomerById error:', error);
      throw error instanceof ServiceErrorImpl
        ? error
        : new ServiceErrorImpl(
            'Failed to fetch customer',
            'UNEXPECTED_ERROR',
            error instanceof Error ? error.message : 'Unknown error',
            error
          );
    }
  }

  async createCustomer(customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>): Promise<Customer> {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .insert([{
          first_name: customer.first_name,
          last_name: customer.last_name,
          email: customer.email,
          phone: customer.phone
        }])
        .select()
        .single();

      if (error) {
        throw new ServiceErrorImpl(
          'Failed to create customer',
          'QUERY_ERROR',
          error.message,
          error
        );
      }

      if (!data) {
        throw new ServiceErrorImpl(
          'Failed to create customer',
          'INSERT_ERROR',
          'No data returned after insert'
        );
      }

      return {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email || '',
        phone: data.phone || '',
        created_at: data.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
    } catch (error) {
      console.error('CustomerService.createCustomer error:', error);
      throw error instanceof ServiceErrorImpl
        ? error
        : new ServiceErrorImpl(
            'Failed to create customer',
            'UNEXPECTED_ERROR',
            error instanceof Error ? error.message : 'Unknown error',
            error
          );
    }
  }
}

export const customerService = new CustomerService();
