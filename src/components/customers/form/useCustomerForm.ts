import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Customer } from "@/types/customer";

interface CustomerFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export function useCustomerForm(
  customer: Customer | null,
  onCustomerUpdated: () => void,
  onClose: () => void
) {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CustomerFormData>({
    defaultValues: customer || {
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

  const onSubmit = async (formData: CustomerFormData) => {
    try {
      if (customer) {
        const { error } = await supabase
          .from('customers')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', customer.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('customers')
          .insert([{
            ...formData,
          }]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: `Customer ${customer ? 'updated' : 'added'} successfully.`,
      });
      onCustomerUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving customer:', error);
      toast({
        title: "Error",
        description: `Failed to ${customer ? 'update' : 'add'} customer.`,
        variant: "destructive",
      });
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    reset
  };
}