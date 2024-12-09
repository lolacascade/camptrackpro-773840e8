import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
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
        .from('slips')
        .insert([{
          name: values.name,
          dock: values.dock,
          length_ft: values.length_ft,
          width_ft: values.width_ft,
          is_covered: values.is_covered,
          electricity_voltage: values.electricity_voltage,
          has_water: values.has_water,
          status: values.status
        }]);

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
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Dock Spot</DialogTitle>
        </DialogHeader>
        <DockSpotForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}