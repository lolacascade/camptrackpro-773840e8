import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface LocationSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function LocationSection({ formData, handleInputChange }: LocationSectionProps) {
  const isFieldComplete = (value: any) => value && value.toString().trim() !== '';
  const completedFields = Object.values(formData.coordinates).filter(isFieldComplete).length;
  const totalFields = Object.keys(formData.coordinates).length;

  return (
    <AccordionItem value="coordinates" className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <AccordionTrigger className="px-4 py-4 hover:no-underline bg-white hover:bg-gray-50/80">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#133134] font-medium">Location Coordinates</span>
          <span className="text-sm text-muted-foreground">
            {completedFields}/{totalFields} fields completed
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 bg-white">
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