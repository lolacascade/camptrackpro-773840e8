import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeaturesSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function FeaturesSection({ formData, handleInputChange }: FeaturesSectionProps) {
  return (
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
  );
}