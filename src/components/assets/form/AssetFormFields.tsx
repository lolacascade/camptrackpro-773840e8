import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Asset } from "@/types/asset";

interface AssetFormFieldsProps {
  newAsset: Partial<Asset>;
  setNewAsset: (asset: Partial<Asset>) => void;
  availableSlots: Array<{ id: number; name: string }>;
}

export const ASSET_TYPES = [
  { value: 'Class A', label: 'Class A Motorhome' },
  { value: 'Class B', label: 'Class B Motorhome' },
  { value: 'Class C', label: 'Class C Motorhome' },
  { value: 'Travel Trailer', label: 'Travel Trailer' },
  { value: 'Fifth Wheel', label: 'Fifth Wheel' },
  { value: 'Pop-up Camper', label: 'Pop-up Camper' },
  { value: 'Truck Camper', label: 'Truck Camper' },
  { value: 'Toy Hauler', label: 'Toy Hauler' },
  { value: 'Teardrop', label: 'Teardrop Trailer' },
  { value: 'Van', label: 'Van Conversion' },
  { value: 'Other', label: 'Other' }
] as const;

export function AssetFormFields({ newAsset, setNewAsset, availableSlots }: AssetFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="asset_name">RV Name/Identifier *</Label>
        <Input
          id="asset_name"
          value={newAsset.asset_name || ''}
          onChange={(e) => setNewAsset({ ...newAsset, asset_name: e.target.value })}
          placeholder="Enter RV name or identifier"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="asset_size">Size *</Label>
        <Input
          id="asset_size"
          value={newAsset.asset_size || ''}
          onChange={(e) => setNewAsset({ ...newAsset, asset_size: e.target.value })}
          placeholder="e.g., 32 ft"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="asset_type">RV Type *</Label>
        <Select
          value={newAsset.asset_type || ''}
          onValueChange={(value) => setNewAsset({ ...newAsset, asset_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select RV type" />
          </SelectTrigger>
          <SelectContent>
            {ASSET_TYPES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slip_id">Site *</Label>
        <Select
          value={newAsset.slip_id?.toString() || ''}
          onValueChange={(value) => setNewAsset({ ...newAsset, slip_id: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a site" />
          </SelectTrigger>
          <SelectContent>
            {availableSlots.map((slot) => (
              <SelectItem key={slot.id} value={slot.id.toString()}>
                {slot.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}