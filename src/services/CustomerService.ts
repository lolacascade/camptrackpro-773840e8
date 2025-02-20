
import { supabase } from "@/integrations/supabase/client";
import { Customer, CustomerFormData, CustomerQueryOptions } from "@/types/customer";
import { useOrganization } from "@/hooks/use-organization";

export async function saveCustomer(
  formData: CustomerFormData, 
  customerId: string | null,
  organizationId: string,
  accountId: string
) {
  const dataWithContext = {
    ...formData,
    organization_id: organizationId,
    account_id: accountId
  };

  if (customerId) {
    const { error } = await supabase
      .from('customers')
      .update(dataWithContext)
      .eq('id', customerId);

    if (error) throw error;
    return 'Customer updated successfully';
  } 

  const { error } = await supabase
    .from('customers')
    .insert([dataWithContext]);

  if (error) throw error;
  return 'Customer added successfully';
}

export async function fetchCustomers(options?: CustomerQueryOptions) {
  const { organizationId } = useOrganization();
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('organization_id', organizationId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Customer[];
}
