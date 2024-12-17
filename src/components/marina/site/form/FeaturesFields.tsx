import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SpecialFeatures } from "../types"

interface FeaturesFieldsProps {
  features: SpecialFeatures;
  onFeaturesChange: (features: SpecialFeatures) => void;
}

export function FeaturesFields({ features, onFeaturesChange }: FeaturesFieldsProps) {
  const toggleFeature = (key: keyof SpecialFeatures) => {
    onFeaturesChange({
      ...features,
      [key]: !features[key]
    });
  };

  return (
    <div className="space-y-4">
      <Label>Special Features</Label>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="petFriendly"
            checked={features.petFriendly}
            onCheckedChange={() => toggleFeature('petFriendly')}
          />
          <label htmlFor="petFriendly">Pet Friendly</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="shade"
            checked={features.shade}
            onCheckedChange={() => toggleFeature('shade')}
          />
          <label htmlFor="shade">Shade Available</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="firePit"
            checked={features.firePit}
            onCheckedChange={() => toggleFeature('firePit')}
          />
          <label htmlFor="firePit">Fire Pit</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="picnicTable"
            checked={features.picnicTable}
            onCheckedChange={() => toggleFeature('picnicTable')}
          />
          <label htmlFor="picnicTable">Picnic Table</label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="wifi"
            checked={features.wifi}
            onCheckedChange={() => toggleFeature('wifi')}
          />
          <label htmlFor="wifi">Wi-Fi Coverage</label>
        </div>
      </div>
    </div>
  )
}