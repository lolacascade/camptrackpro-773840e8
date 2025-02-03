import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarinaFormData } from "@/types/marina";

interface LocationSectionProps {
  formData: MarinaFormData;
  handleInputChange: (e: any) => void;
}

export function LocationSection({ formData, handleInputChange }: LocationSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Location & Approach</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coordinates.latitude">Latitude</Label>
          <Input
            id="coordinates.latitude"
            name="coordinates.latitude"
            type="number"
            value={formData.coordinates.latitude}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coordinates.longitude">Longitude</Label>
          <Input
            id="coordinates.longitude"
            name="coordinates.longitude"
            type="number"
            value={formData.coordinates.longitude}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="approach_info.depth">Approach Depth</Label>
          <Input
            id="approach_info.depth"
            name="approach_info.depth"
            value={formData.approach_info.depth}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="approach_info.width">Approach Width</Label>
          <Input
            id="approach_info.width"
            name="approach_info.width"
            value={formData.approach_info.width}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="approach_info.obstacles">Known Obstacles</Label>
          <Input
            id="approach_info.obstacles"
            name="approach_info.obstacles"
            value={formData.approach_info.obstacles}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}