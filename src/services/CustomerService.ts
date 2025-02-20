
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";
import { QueryOptions, applyQueryOptions } from "./utils/queryUtils";

export async function getCustomers(
  organizationId: string,
  accountId: string,
  options?: QueryOptions
): Promise<{ data: Customer[]; total: number }> {
  try {
    let query = supabase
      .from('customers')
      .select('*', { count: 'exact' })
      .eq('organization_id', organizationId)
      .eq('account_id', accountId);

    if (options) {
      query = applyQueryOptions(query, options, ['first_name', 'last_name', 'email']);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return {
      data: data as Customer[],
      total: count || 0
    };
  } catch (error) {
    console.error('Error in getCustomers:', error);
    throw error;
  }
}

export async function getCustomerById(
  customerId: string,
  organizationId: string,
  accountId: string
): Promise<Customer> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .eq('organization_id', organizationId)
      .eq('account_id', accountId)
      .single();

    if (error) throw error;
    return data as Customer;
  } catch (error) {
    console.error('Error in getCustomerById:', error);
    throw error;
  }
}

export async function createCustomer(
  customer: CustomerCreateInput,
  organizationId: string,
  accountId: string
): Promise<Customer> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .insert([{ ...customer, organization_id: organizationId, account_id: accountId }])
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  } catch (error) {
    console.error('Error in createCustomer:', error);
    throw error;
  }
}

export async function updateCustomer(
  customerId: string,
  updates: CustomerUpdateInput,
  organizationId: string,
  accountId: string
): Promise<Customer> {
  try {
    const { data, error } = await supabase
      .from('customers')
      .update(updates)
      .eq('id', customerId)
      .eq('organization_id', organizationId)
      .eq('account_id', accountId)
      .select()
      .single();

    if (error) throw error;
    return data as Customer;
  } catch (error) {
    console.error('Error in updateCustomer:', error);
    throw error;
  }
}

export async function deleteCustomer(
  customerId: string,
  organizationId: string,
  accountId: string
): Promise<void> {
  try {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', customerId)
      .eq('organization_id', organizationId)
      .eq('account_id', accountId);

    if (error) throw error;
  } catch (error) {
    console.error('Error in deleteCustomer:', error);
    throw error;
  }
}
