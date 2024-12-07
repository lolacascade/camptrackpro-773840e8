import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { LocationSection } from "./sections/LocationSection";
import { ApproachSection } from "./sections/ApproachSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { SocialMediaSection } from "./sections/SocialMediaSection";

interface MarinaFormProps {
  initialData?: any;
}

export function MarinaForm({ initialData }: MarinaFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    address: '',
    contact_phone: '',
    contact_email: '',
    website: '',
    coordinates: { latitude: '', longitude: '' },
    total_slips: null,
    approach_info: {
      min_approach_depth: '',
      min_channel_depth: '',
      mean_low_water_depth: '',
      mean_high_water_clearance: '',
    },
    services_amenities: {
      max_vessel_loa: false,
      fuel_gas: false,
      fuel_diesel: false,
      pump_out: false,
      electricity: false,
      water: false,
      wifi: false,
      restrooms: false,
      laundry: false,
      parking: false,
      security: false,
      dry_storage: false,
      repair_services: false,
      chandlery: false,
      restaurants_nearby: false,
      grocery_store: false,
    },
    other_features: {
      wheelchair_accessible: false,
      events_hosted: false,
      weather_monitoring: false,
      fire_safety: false,
      first_aid: false,
      mooring: false,
      dinghy_storage: false,
      fishing_area: false,
      boat_ramp: false,
      fuel_dock_24h: false,
    },
    social_media: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: '',
      tiktok: '',
      youtube: '',
    },
  });

  useEffect(() => {
    const fetchUserMarinaDetails = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('marina_details')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) {
          console.error('Error fetching marina details:', error);
          return;
        }

        if (data) {
          setFormData(data);
        }
      }
    };

    fetchUserMarinaDetails();
  }, []);

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
    setIsLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const dataToSubmit = {
        ...formData,
        user_id: user.id
      };

      const { error } = await supabase
        .from('marina_details')
        .upsert([dataToSubmit])
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Marina details have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving marina details:', error);
      toast({
        title: "Error",
        description: "Failed to save marina details. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Accordion type="single" collapsible className="w-full">
        <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />
        <LocationSection formData={formData} handleInputChange={handleInputChange} />
        <ApproachSection formData={formData} handleInputChange={handleInputChange} />
        <ServicesSection formData={formData} handleInputChange={handleInputChange} />
        <FeaturesSection formData={formData} handleInputChange={handleInputChange} />
        <SocialMediaSection formData={formData} handleInputChange={handleInputChange} />
      </Accordion>

      <Button 
        onClick={handleSubmit} 
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
}