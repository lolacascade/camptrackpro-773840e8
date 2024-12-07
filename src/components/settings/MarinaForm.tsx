import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface MarinaFormProps {
  initialData?: any;
}

export function MarinaForm({ initialData }: MarinaFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState(initialData || {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    coordinates: { latitude: '', longitude: '' },
    total_slips: '',
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

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: section === 'coordinates' || section === 'approach_info' || section === 'social_media'
        ? { ...prev[section], [field]: value }
        : section === 'services_amenities' || section === 'other_features'
          ? { ...prev[section], [field]: value }
          : value
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('marina_details')
        .upsert([formData])
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
        <AccordionItem value="basic">
          <AccordionTrigger>Basic Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="marina-name">Marina Name</Label>
                <Input
                  id="marina-name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', '', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="marina-address">Address</Label>
                <Textarea
                  id="marina-address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', '', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="marina-phone">Phone</Label>
                <Input
                  id="marina-phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', '', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="marina-email">Email</Label>
                <Input
                  id="marina-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', '', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="marina-website">Website</Label>
                <Input
                  id="marina-website"
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', '', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="marina-capacity">Total Slips</Label>
                <Input
                  id="marina-capacity"
                  type="number"
                  value={formData.total_slips}
                  onChange={(e) => handleInputChange('total_slips', '', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="coordinates">
          <AccordionTrigger>Location Coordinates</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  value={formData.coordinates.latitude}
                  onChange={(e) => handleInputChange('coordinates', 'latitude', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  value={formData.coordinates.longitude}
                  onChange={(e) => handleInputChange('coordinates', 'longitude', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="approach">
          <AccordionTrigger>Approach Information</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="min-approach-depth">Minimum Approach Depth</Label>
                <Input
                  id="min-approach-depth"
                  value={formData.approach_info.min_approach_depth}
                  onChange={(e) => handleInputChange('approach_info', 'min_approach_depth', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="min-channel-depth">Minimum Channel Depth</Label>
                <Input
                  id="min-channel-depth"
                  value={formData.approach_info.min_channel_depth}
                  onChange={(e) => handleInputChange('approach_info', 'min_channel_depth', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mean-low-water">Mean Low Water Dock Depth</Label>
                <Input
                  id="mean-low-water"
                  value={formData.approach_info.mean_low_water_depth}
                  onChange={(e) => handleInputChange('approach_info', 'mean_low_water_depth', e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="mean-high-water">Mean High Water Clearance</Label>
                <Input
                  id="mean-high-water"
                  value={formData.approach_info.mean_high_water_clearance}
                  onChange={(e) => handleInputChange('approach_info', 'mean_high_water_clearance', e.target.value)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="services">
          <AccordionTrigger>Services & Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              {Object.entries(formData.services_amenities).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value as boolean}
                    onCheckedChange={(checked) => 
                      handleInputChange('services_amenities', key, checked)
                    }
                  />
                  <Label htmlFor={key}>
                    {key.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger>Other Features</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              {Object.entries(formData.other_features).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={value as boolean}
                    onCheckedChange={(checked) => 
                      handleInputChange('other_features', key, checked)
                    }
                  />
                  <Label htmlFor={key}>
                    {key.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="social">
          <AccordionTrigger>Social Media Links</AccordionTrigger>
          <AccordionContent>
            <div className="grid gap-4">
              {Object.entries(formData.social_media).map(([platform, value]) => (
                <div key={platform} className="grid gap-2">
                  <Label htmlFor={platform}>
                    {platform.charAt(0).toUpperCase() + platform.slice(1)}
                  </Label>
                  <Input
                    id={platform}
                    type="url"
                    value={value as string}
                    onChange={(e) => 
                      handleInputChange('social_media', platform, e.target.value)
                    }
                    placeholder={`Enter ${platform} URL`}
                  />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
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