import { useForm } from "react-hook-form";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/hooks/use-organization";

export function useCustomerForm(
  customer: Customer | null,
  onCustomerUpdated: () => void,
  onClose: () => void
) {
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: customer ? {
      first_name: customer.first_name,
      last_name: customer.last_name,
      email: customer.email,
      phone: customer.phone || '',
      address: customer.address || '',
      city: customer.city || '',
      state: customer.state || '',
      country: customer.country || '',
      postal_code: customer.postal_code || ''
    } : {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: ''
    }
  });

  const onSubmit = async (formData: any) => {
    if (!organizationId || !accountId) {
      toast({
        title: "Error",
        description: "Organization or account context is missing",
        variant: "destructive",
      });
      return;
    }

    try {
      const dataWithContext = {
        ...formData,
        organization_id: organizationId,
        account_id: accountId
      };

      if (customer) {
        const { error } = await supabase
          .from('customers')
          .update(dataWithContext)
          .eq('id', customer.id.toString());

        if (error) throw error;

        toast({
          title: "Success",
          description: "Customer updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('customers')
          .insert([dataWithContext]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Customer added successfully",
        });
      }

      onCustomerUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
      toast({
        title: "Error",
        description: "Failed to save customer",
        variant: "destructive",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  };
}