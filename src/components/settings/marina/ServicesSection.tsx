import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface ServicesSectionProps {
  services: {
    fuel: boolean;
    power: boolean;
    water: boolean;
    wifi: boolean;
    showers: boolean;
    laundry: boolean;
  };
  onInputChange: (section: string, field: string, value: any) => void;
}

export function ServicesSection({ services, onInputChange }: ServicesSectionProps) {
  return (
    <div className="space-y-4">
      {Object.entries(services).map(([key, value]) => (
        <div key={key} className="flex items-center space-x-2">
          <Checkbox
            id={key}
            checked={value}
            onCheckedChange={(checked) => 
              onInputChange('services_amenities', key, checked)
            }
          />
          <Label htmlFor={key} className="capitalize">
            {key}
          </Label>
        </div>
      ))}
    </div>
  );
}