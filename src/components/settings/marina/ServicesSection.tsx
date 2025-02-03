import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { MarinaFormData } from "@/types/marina";

interface ServicesSectionProps {
  formData: MarinaFormData;
  handleInputChange: (e: any) => void;
}

export function ServicesSection({ formData, handleInputChange }: ServicesSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Services & Amenities</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-medium">Basic Services</h4>
          <div className="space-y-2">
            {Object.entries(formData.services_amenities).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`services_amenities.${key}`}
                  name={`services_amenities.${key}`}
                  checked={value}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        name: `services_amenities.${key}`,
                        value: checked,
                        type: 'checkbox',
                      },
                    })
                  }
                />
                <Label htmlFor={`services_amenities.${key}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="font-medium">Other Features</h4>
          <div className="space-y-2">
            {Object.entries(formData.other_features).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`other_features.${key}`}
                  name={`other_features.${key}`}
                  checked={value}
                  onCheckedChange={(checked) =>
                    handleInputChange({
                      target: {
                        name: `other_features.${key}`,
                        value: checked,
                        type: 'checkbox',
                      },
                    })
                  }
                />
                <Label htmlFor={`other_features.${key}`}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}