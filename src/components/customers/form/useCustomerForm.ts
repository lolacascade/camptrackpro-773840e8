import { useForm } from "react-hook-form";
import { Customer } from "@/types/customer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export function useCustomerForm(
  customer: Customer | null,
  onCustomerUpdated: () => void,
  onClose: () => void
) {
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
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

  const onSubmit = async (formData: any) => {
    try {
      if (customer) {
        const { error } = await supabase
          .from('customers')
          .update(formData)
          .eq('id', customer.id.toString());

        if (error) throw error;
        
        toast({
          title: "Success",
          description: "Customer updated successfully",
        });
      } else {
        const { error } = await supabase
          .from('customers')
          .insert([formData]);

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