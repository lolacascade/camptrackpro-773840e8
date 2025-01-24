import { supabase } from "@/integrations/supabase/client";
import { CustomerFormData } from "./types";

export const saveCustomer = async (
  formData: CustomerFormData, 
  customerId: string | null,
  organizationId: string,
  accountId: string
) => {
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
};