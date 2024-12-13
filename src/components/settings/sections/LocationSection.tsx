import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LocationSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function LocationSection({ formData, handleInputChange }: LocationSectionProps) {
  return (
    <AccordionItem value="coordinates" className="border rounded-lg bg-white shadow-sm">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span>Location Coordinates</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              id="latitude"
              value={formData.coordinates.latitude}
              onChange={(e) => handleInputChange('coordinates', 'latitude', e.target.value)}
              className="border-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              id="longitude"
              value={formData.coordinates.longitude}
              onChange={(e) => handleInputChange('coordinates', 'longitude', e.target.value)}
              className="border-input"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}