import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { DockSpotForm, DockSpotFormValues } from "./dock-spot-dialog/DockSpotForm"

export interface AddDockSpotDialogProps {
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
        title: "Space Added",
        description: `New space ${values.name} has been created.`,
      });
    } catch (error) {
      console.error('Error creating space:', error);
      toast({
        title: "Error",
        description: "Failed to create space. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Space
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Space</DialogTitle>
        </DialogHeader>
        <DockSpotForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}