
import { supabase } from "@/integrations/supabase/client";
import { Customer, CustomerFormData, CustomerQueryOptions } from "@/types/customer";
import { FilteringService } from "./base/FilteringService";
import { applyPagination, applySorting } from "./utils/queryUtils";

export class CustomerService extends FilteringService {
  async list(organizationId: string, options: CustomerQueryOptions = {}): Promise<Customer[]> {
    let query = supabase
      .from('customers')
      .select(`
        *
      `)
      .eq('organization_id', organizationId);

    if (options.searchTerm) {
      query = query.or(`first_name.ilike.%${options.searchTerm}%,last_name.ilike.%${options.searchTerm}%,email.ilike.%${options.searchTerm}%`);
    }

    if (options.sortBy) {
      query = applySorting(query, options.sortBy, options.sortOrder || 'asc');
    }

    if (options.page && options.pageSize) {
      query = applyPagination(query, options.page, options.pageSize);
    }

    const { data, error } = await query;

    if (error) {
      throw new Error(`Failed to fetch customers: ${error.message}`);
    }

    return data as Customer[];
  }

  async get(id: string): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .select(`
        *
      `)
      .eq('id', id)
      .single();

    if (error) {
      throw new Error(`Failed to fetch customer: ${error.message}`);
    }

    return data as Customer;
  }

  async create(formData: CustomerFormData, organizationId: string, accountId: string): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .insert([{
        ...formData,
        organization_id: organizationId,
        account_id: accountId
      }])
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }

    return data as Customer;
  }

  async update(id: string, formData: CustomerFormData): Promise<Customer> {
    const { data, error } = await supabase
      .from('customers')
      .update(formData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update customer: ${error.message}`);
    }

    return data as Customer;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete customer: ${error.message}`);
    }
  }
}

export const customerService = new CustomerService();
