import { useState, useEffect } from 'react';
import { useSessionContext } from '@supabase/auth-helpers-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { MarinaFormData } from '@/types/marina';

export const useMarinaForm = (initialData?: any) => {
  const { session } = useSessionContext();
  const { toast } = useToast();
  const [formData, setFormData] = useState<MarinaFormData>({
    name: '',
    address: '',
    contact_email: '',
    contact_phone: '',
    total_slips: null,
    website: '',
    coordinates: {
      latitude: '',
      longitude: ''
    },
    approach_info: {
      depth: '',
      obstacles: '',
      current: ''
    },
    services_amenities: {
      fuel: false,
      power: false,
      water: false,
      wifi: false,
      showers: false,
      laundry: false
    },
    other_features: {
      restaurant: false,
      shop: false,
      repair: false,
      storage: false
    },
    social_media: {
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: section === 'coordinates' || section === 'approach_info' || section === 'social_media'
        ? { ...prev[section], [field]: value }
        : section === 'services_amenities' || section === 'other_features'
          ? { ...prev[section], [field]: value }
          : section === 'total_slips'
            ? value === '' ? null : parseInt(value, 10)
            : value
    }));
  };

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to update marina details",
        variant: "destructive"
      });
      return;
    }

    try {
      const dataToSubmit = {
        ...formData,
        user_id: session.user.id,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('marina_details')
        .upsert([dataToSubmit])
        .select()
        .maybeSingle();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Marina details updated successfully"
      });
    } catch (error) {
      console.error('Error updating marina details:', error);
      toast({
        title: "Error",
        description: "Failed to update marina details",
        variant: "destructive"
      });
    }
  };

  return {
    formData,
    handleInputChange,
    handleSubmit
  };
};