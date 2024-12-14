import { Button } from "@/components/ui/button";
import { Accordion } from "@/components/ui/accordion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from '@supabase/auth-helpers-react';
import { BasicInfoSection } from "./sections/BasicInfoSection";
import { LocationSection } from "./sections/LocationSection";
import { ApproachSection } from "./sections/ApproachSection";
import { ServicesSection } from "./sections/ServicesSection";
import { FeaturesSection } from "./sections/FeaturesSection";
import { SocialMediaSection } from "./sections/SocialMediaSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Save } from "lucide-react";

interface MarinaFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function MarinaForm({ initialData, onSuccess }: MarinaFormProps) {
  const { toast } = useToast();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
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
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
        coordinates: initialData.coordinates || prev.coordinates,
        approach_info: initialData.approach_info || prev.approach_info,
        services_amenities: initialData.services_amenities || prev.services_amenities,
        other_features: initialData.other_features || prev.other_features,
        social_media: initialData.social_media || prev.social_media,
      }));
    }
  }, [initialData]);

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be signed in to save marina details.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const dataToSubmit = {
        ...formData,
        user_id: session.user.id,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('marina_details')
        .upsert([dataToSubmit])
        .select();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Marina details saved successfully.",
      });

      onSuccess?.();
    } catch (error) {
      console.error('Error saving marina details:', error);
      setError("Failed to save marina details. Please try again.");
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
    <div className="relative space-y-8">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <BasicInfoSection formData={formData} handleInputChange={handleInputChange} />
        <LocationSection formData={formData} handleInputChange={handleInputChange} />
        <ApproachSection formData={formData} handleInputChange={handleInputChange} />
        <ServicesSection formData={formData} handleInputChange={handleInputChange} />
        <FeaturesSection formData={formData} handleInputChange={handleInputChange} />
        <SocialMediaSection formData={formData} handleInputChange={handleInputChange} />
      </Accordion>

      <div className="fixed bottom-0 right-0 z-50 p-4 md:p-6">
        <Button 
          onClick={handleSubmit} 
          variant="outline"
          size="lg"
          className="shadow-lg border-[#133134] text-[#133134] hover:bg-[#133134] hover:text-white"
          disabled={isLoading}
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
      <div className="h-20" /> {/* Spacer for the fixed button */}
    </div>
  );
}