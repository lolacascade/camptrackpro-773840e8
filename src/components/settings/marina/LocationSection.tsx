import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationSectionProps {
  coordinates: {
    latitude: string;
    longitude: string;
  };
  onInputChange: (section: string, field: string, value: any) => void;
}

export function LocationSection({ coordinates, onInputChange }: LocationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="latitude">Latitude</Label>
        <Input
          id="latitude"
          value={coordinates.latitude}
          onChange={(e) => onInputChange('coordinates', 'latitude', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="longitude">Longitude</Label>
        <Input
          id="longitude"
          value={coordinates.longitude}
          onChange={(e) => onInputChange('coordinates', 'longitude', e.target.value)}
        />
      </div>
    </div>
  );
}