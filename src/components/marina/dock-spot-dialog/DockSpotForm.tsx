import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { BasicInfoSection } from "./form-sections/BasicInfoSection";
import { UtilitiesSection } from "./form-sections/UtilitiesSection";
import { FeaturesSection } from "./form-sections/FeaturesSection";
import { DockSpotFormValues, dockSpotFormSchema } from "./types";
import { useOrganization } from "@/hooks/use-organization";
import { toast } from "sonner";

interface DockSpotFormProps {
  onSubmit: (values: DockSpotFormValues) => void;
  defaultValues?: Partial<DockSpotFormValues>;
}

export function DockSpotForm({ onSubmit, defaultValues }: DockSpotFormProps) {
  const { organizationId, accountId } = useOrganization();
  
  const form = useForm<DockSpotFormValues>({
    resolver: zodResolver(dockSpotFormSchema),
    defaultValues: {
      name: '',
      length_ft: undefined,
      width_ft: undefined,
      is_covered: false,
      has_water: false,
      electricity_voltage: '',
      utility_connection_type: '',
      status: 'available',
      ...defaultValues,
    },
  });

  const handleSubmit = async (values: DockSpotFormValues) => {
    if (!organizationId || !accountId) {
      toast.error("Missing organization or account context");
      return;
    }

    onSubmit({
      ...values,
      organization_id: organizationId,
      account_id: accountId,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <BasicInfoSection form={form} />
        <UtilitiesSection form={form} />
        <FeaturesSection form={form} />
        <Button type="submit" className="w-full">
          Create Spot
        </Button>
      </form>
    </Form>
  );
}