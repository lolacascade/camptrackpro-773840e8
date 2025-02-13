
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useOrganization } from "@/hooks/use-organization";
import { saveCustomer } from "./customerService";
import { getDefaultValues } from "./utils";
import { UseCustomerFormProps, CustomerFormData } from "./types";

export function useCustomerForm({
  customer,
  onCustomerUpdated,
  onClose
}: UseCustomerFormProps) {
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();
  
  const defaultValues = getDefaultValues(customer);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<CustomerFormData>({
    defaultValues,
    values: defaultValues
  });

  const onSubmit = async (formData: CustomerFormData) => {
    if (!organizationId || !accountId) {
      toast({
        title: "Error",
        description: "Organization or account context is missing",
        variant: "destructive",
      });
      return;
    }

    try {
      const message = await saveCustomer(
        formData, 
        customer?.id?.toString() || null,
        organizationId,
        accountId
      );

      toast({
        title: "Success",
        description: message,
      });

      onCustomerUpdated();
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save customer",
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
