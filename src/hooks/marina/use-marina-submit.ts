import { useSessionContext } from '@supabase/auth-helpers-react';
import { useToast } from '@/components/ui/use-toast';
import { MarinaFormData } from '@/types/marina';
import { supabase } from '@/integrations/supabase/client';

export const useMarinaSubmit = (onSuccess?: () => void) => {
  const { session } = useSessionContext();
  const { toast } = useToast();

  const handleSubmit = async (formData: MarinaFormData, e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to update marina details",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('marina_details')
        .upsert({
          ...formData,
          user_id: session.user.id,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Marina details updated successfully",
      });

      onSuccess?.();
    } catch (error: any) {
      console.error('Error updating marina details:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update marina details",
        variant: "destructive",
      });
    }
  };

  return { handleSubmit };
};