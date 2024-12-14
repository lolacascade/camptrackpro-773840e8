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
  { value: 'Speed Boat', label: 'Speed Boat' },
  { value: 'Sailboat', label: 'Sailboat' },
  { value: 'Fishing Boat', label: 'Fishing Boat' },
  { value: 'Pontoon Boat', label: 'Pontoon Boat' },
  { value: 'Yacht', label: 'Yacht' },
  { value: 'Catamaran', label: 'Catamaran' },
  { value: 'Kayak', label: 'Kayak' },
  { value: 'Rowboat', label: 'Rowboat' },
  { value: 'Houseboat', label: 'Houseboat' },
  { value: 'Cruise Boat', label: 'Cruise Boat' },
  { value: 'Jet Ski', label: 'Jet Ski' },
  { value: 'Other', label: 'Other' }
] as const;

export function AssetFormFields({ newAsset, setNewAsset, availableSlots }: AssetFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="asset_name">Asset Name *</Label>
        <Input
          id="asset_name"
          value={newAsset.asset_name || ''}
          onChange={(e) => setNewAsset({ ...newAsset, asset_name: e.target.value })}
          placeholder="Enter asset name"
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
        <Label htmlFor="asset_type">Asset Type *</Label>
        <Select
          value={newAsset.asset_type || ''}
          onValueChange={(value) => setNewAsset({ ...newAsset, asset_type: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select asset type" />
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
        <Label htmlFor="slip_id">Slot *</Label>
        <Select
          value={newAsset.slip_id?.toString() || ''}
          onValueChange={(value) => setNewAsset({ ...newAsset, slip_id: parseInt(value) })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a slot" />
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