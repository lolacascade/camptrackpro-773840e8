import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeaturesSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function FeaturesSection({ formData, handleInputChange }: FeaturesSectionProps) {
  return (
    <AccordionItem value="features" className="border rounded-lg bg-white shadow-sm">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span>Other Features</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
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
              <Label htmlFor={key} className="text-sm font-normal">
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