import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ServicesSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function ServicesSection({ formData, handleInputChange }: ServicesSectionProps) {
  return (
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
  );
}