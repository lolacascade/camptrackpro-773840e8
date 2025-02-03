import { useState } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { useToast } from '@/components/ui/use-toast';
import { MarinaFormData } from '@/types/marina';
import { supabase } from '@/integrations/supabase/client';

interface UseMarinaFormProps {
  initialData?: Partial<MarinaFormData>;
  onSuccess?: () => void;
}

interface InputChangeEvent {
  target: {
    name: string;
    value: string | number | boolean;
    type?: string;
  };
}

export const useMarinaForm = ({ initialData, onSuccess }: UseMarinaFormProps) => {
  const { session } = useSessionContext();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<MarinaFormData>({
    name: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    total_slips: 0,
    website: '',
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    approach_info: {
      depth: '',
      width: '',
      obstacles: '',
    },
    services_amenities: {
      fuel: false,
      electricity: false,
      water: false,
      pumpout: false,
      maintenance: false,
    },
    other_features: {
      restrooms: false,
      showers: false,
      laundry: false,
      parking: false,
      wifi: false,
    },
    social_media: {
      facebook: '',
      instagram: '',
      twitter: '',
    },
    ...initialData,
  });

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value, type } = e.target;
    const nameParts = name.split('.');

    if (nameParts.length === 1) {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? Number(value) : value,
      }));
    } else {
      const [section, field] = nameParts;
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof MarinaFormData],
          [field]: type === 'checkbox' ? value : value,
        },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  return {
    formData,
    handleInputChange,
    handleSubmit,
  };
};