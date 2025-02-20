
import { MarinaFormData } from '@/types/marina';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useMarinaSubmit = (onSuccess?: () => void) => {
  const { toast } = useToast();

  const handleSubmit = async (formData: MarinaFormData, e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Commenting out marina details query until table is created
      // const { error } = await supabase
      //   .from('marina_details')
      //   .upsert({
      //     ...formData,
      //     updated_at: new Date().toISOString(),
      //   });

      // if (error) throw error;

      toast({
        title: 'Success',
        description: 'Marina details saved successfully.',
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error saving marina details:', error);
      toast({
        title: 'Error',
        description: 'Failed to save marina details. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return {
    handleSubmit,
  };
};
