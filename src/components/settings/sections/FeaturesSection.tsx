import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FeaturesSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function FeaturesSection({ formData, handleInputChange }: FeaturesSectionProps) {
  const completedFields = Object.values(formData.other_features).filter(Boolean).length;
  const totalFields = Object.keys(formData.other_features).length;

  return (
    <AccordionItem value="features" className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <AccordionTrigger className="px-4 py-4 hover:no-underline bg-white hover:bg-gray-50/80">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#133134] font-medium">Other Features</span>
          <span className="text-sm text-muted-foreground">
            {completedFields}/{totalFields} enabled
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 bg-white">
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