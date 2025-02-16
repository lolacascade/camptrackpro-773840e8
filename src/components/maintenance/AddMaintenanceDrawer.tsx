
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormSelect } from "@/components/common/FormSelect";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useOrganization } from "@/hooks/use-organization";

interface AddMaintenanceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMaintenanceAdded: () => void;
}

export function AddMaintenanceDrawer({ 
  isOpen, 
  onClose,
  onMaintenanceAdded 
}: AddMaintenanceDrawerProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { organizationId, accountId } = useOrganization();
  const [formData, setFormData] = useState({
    description: '',
    priority: 'medium',
  });

  const priorityOptions = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!organizationId || !accountId) {
      toast({
        title: "Error",
        description: "Organization context not found",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase
        .from('maintenance_requests')
        .insert([{
          description: formData.description,
          priority: formData.priority,
          status: 'pending',
          organization_id: organizationId,
          account_id: accountId
        }]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Maintenance request created successfully",
      });
      
      onMaintenanceAdded();
      onClose();
    } catch (error) {
      console.error('Error creating maintenance request:', error);
      toast({
        title: "Error",
        description: "Failed to create maintenance request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle>Add Maintenance Request</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <Textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div>
            <FormSelect
              value={formData.priority}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              options={priorityOptions}
              placeholder="Select priority"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create'}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
