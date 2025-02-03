import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMarinaForm } from "@/hooks/use-marina-form";
import { BasicInfoSection } from "./marina/BasicInfoSection";
import { LocationSection } from "./marina/LocationSection";
import { ServicesSection } from "./marina/ServicesSection";

interface MarinaFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export function MarinaForm({ initialData, onSuccess }: MarinaFormProps) {
  const { formData, handleInputChange, handleSubmit } = useMarinaForm({
    initialData,
    onSuccess,
  });

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleSubmit();
    }}>
      <div className="space-y-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
          <BasicInfoSection 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          <LocationSection 
            coordinates={formData.coordinates} 
            onInputChange={handleInputChange} 
          />
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Services & Amenities</h3>
          <ServicesSection 
            services={formData.services_amenities} 
            onInputChange={handleInputChange} 
          />
        </Card>

        <div className="flex justify-end">
          <Button type="submit">
            Save Changes
          </Button>
        </div>
      </div>
    </form>
  );
}