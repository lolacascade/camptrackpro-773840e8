import { BasicInfoSection } from "./marina/BasicInfoSection";
import { LocationSection } from "./marina/LocationSection";
import { ServicesSection } from "./marina/ServicesSection";
import { useMarinaForm } from "@/hooks/use-marina-form";
import { MarinaFormProps } from "@/types/marina";

export function MarinaForm({ initialData, onSuccess }: MarinaFormProps) {
  const { formData, handleInputChange, handleSubmit } = useMarinaForm({
    initialData,
    onSuccess,
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <BasicInfoSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
      <LocationSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
      <ServicesSection 
        formData={formData} 
        handleInputChange={handleInputChange} 
      />
    </form>
  );
}