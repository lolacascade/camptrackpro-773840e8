import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { DockSpotForm } from "./dock-spot-dialog/DockSpotForm"
import { DockSpotFormValues } from "./dock-spot-dialog/types"
import { useOrganization } from "@/hooks/use-organization"

export interface AddDockSpotDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDockSpotAdded: () => void;
}

export function AddDockSpotDialog({ isOpen, onOpenChange, onDockSpotAdded }: AddDockSpotDialogProps) {
  const { toast } = useToast();
  const { organizationId, accountId } = useOrganization();

  const onSubmit = async (values: DockSpotFormValues) => {
    try {
      if (!organizationId || !accountId) {
        toast({
          title: "Error",
          description: "Missing organization or account context",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('slots')
        .insert([{
          name: values.name,
          length_ft: values.length_ft,
          width_ft: values.width_ft,
          is_covered: values.is_covered,
          electricity_voltage: values.electricity_voltage,
          has_water: values.has_water,
          status: values.status,
          location_identifier: values.name, // Using name as location identifier
          organization_id: organizationId,
          account_id: accountId,
          user_id: (await supabase.auth.getUser()).data.user?.id
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Space</DialogTitle>
        </DialogHeader>
        <DockSpotForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}