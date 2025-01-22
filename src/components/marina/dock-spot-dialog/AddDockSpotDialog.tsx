import { BaseDrawer } from "@/components/common/BaseDrawer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { DockSpotForm, DockSpotFormValues } from "./DockSpotForm";

interface AddDockSpotDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDockSpotAdded: () => void;
}

export function AddDockSpotDialog({ isOpen, onOpenChange, onDockSpotAdded }: AddDockSpotDialogProps) {
  const { toast } = useToast();

  const onSubmit = async (values: DockSpotFormValues) => {
    try {
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
          location_identifier: values.name, // Using name as location identifier
          user_id: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      onOpenChange(false);
      onDockSpotAdded();
      
      toast({
        title: "Dock Spot Added",
        description: `New dock spot ${values.name} has been created.`,
      });
    } catch (error) {
      console.error('Error creating slip:', error);
      toast({
        title: "Error",
        description: "Failed to create dock spot. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <BaseDrawer
      open={isOpen}
      onClose={() => onOpenChange(false)}
      title="Add New Dock Spot"
    >
      <DockSpotForm onSubmit={onSubmit} />
    </BaseDrawer>
  );
}