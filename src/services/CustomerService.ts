
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { QueryOptions, QueryResult, applyQueryOptions } from "./utils/queryUtils";
import { toast } from "sonner";

export interface CustomerQueryOptions extends QueryOptions {
  organizationId?: string;
  accountId?: string;
}

class CustomerService {
  private tableName = 'customers';

  async getCustomers(options: CustomerQueryOptions = {}): Promise<QueryResult<Customer>> {
    try {
      let query = supabase
        .from(this.tableName)
        .select('*', { count: 'exact' });

      // Apply organization and account filters
      if (options.organizationId) {
        query = query.eq('organization_id', options.organizationId);
      }
      if (options.accountId) {
        query = query.eq('account_id', options.accountId);
      }

      // Apply common query options
      query = applyQueryOptions(query, options, ['first_name', 'last_name', 'email']);

      const { data, error, count } = await query;

      if (error) {
        console.error('Error fetching customers:', error);
        toast.error('Failed to fetch customers');
        throw error;
      }

      return {
        data: data || [],
        total: count || 0,
        page: options.page || 1,
        pageSize: options.pageSize || 25
      };
    } catch (error) {
      console.error('Error in getCustomers:', error);
      throw error;
    }
  }

  async getCustomerById(id: string): Promise<Customer | null> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching customer:', error);
      toast.error('Failed to fetch customer');
      throw error;
    }

    return data;
  }

  async createCustomer(
    customer: Omit<Customer, 'id' | 'created_at' | 'updated_at'>,
    organizationId: string,
    accountId: string
  ): Promise<Customer> {
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([{
        ...customer,
        organization_id: organizationId,
        account_id: accountId
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating customer:', error);
      toast.error('Failed to create customer');
      throw error;
    }

    return data;
  }

  async updateCustomer(
    id: string,
    customer: Partial<Omit<Customer, 'id' | 'created_at' | 'updated_at'>>
  ): Promise<Customer> {
    const { data, error } = await supabase
      .from(this.tableName)
      .update(customer)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating customer:', error);
      toast.error('Failed to update customer');
      throw error;
    }

    return data;
  }

  async deleteCustomer(id: string): Promise<void> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting customer:', error);
      toast.error('Failed to delete customer');
      throw error;
    }

    toast.success('Customer deleted successfully');
  }
}

export const customerService = new CustomerService();
