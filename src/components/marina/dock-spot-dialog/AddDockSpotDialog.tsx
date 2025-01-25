import { BaseDrawer } from "@/components/common/BaseDrawer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DockSpotForm } from "./DockSpotForm";
import { DockSpotFormValues } from "./types";
import { useOrganization } from "@/hooks/use-organization";

interface AddDockSpotDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDockSpotAdded: () => void;
}

export function AddDockSpotDialog({ isOpen, onOpenChange, onDockSpotAdded }: AddDockSpotDialogProps) {
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();

  const onSubmit = async (values: DockSpotFormValues) => {
    if (!organizationId || !accountId) {
      toast({
        title: "Error",
        description: "Missing organization or account context",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;

      const { error } = await supabase
        .from('slots')
        .insert({
          name: values.name,
          length_ft: values.length_ft,
          width_ft: values.width_ft,
          is_covered: values.is_covered,
          electricity_voltage: values.electricity_voltage,
          has_water: values.has_water,
          status: values.status,
          location_identifier: values.name,
          user_id: userId,
          organization_id: organizationId,
          account_id: accountId
        });

      if (error) throw error;

      onOpenChange(false);
      onDockSpotAdded();
      
      toast({
        title: "Success",
        description: `New spot ${values.name} has been created.`,
      });
    } catch (error) {
      console.error('Error creating spot:', error);
      toast({
        title: "Error",
        description: "Failed to create spot. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <BaseDrawer
      open={isOpen}
      onClose={() => onOpenChange(false)}
      title="Add New Spot"
    >
      <DockSpotForm onSubmit={onSubmit} />
    </BaseDrawer>
  );
}