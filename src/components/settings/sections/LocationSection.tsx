import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LocationSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function LocationSection({ formData, handleInputChange }: LocationSectionProps) {
  return (
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
  );
}