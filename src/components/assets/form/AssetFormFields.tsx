
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset } from "@/types/asset";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { SlotInfo } from "../hooks/useAvailableSlots";

interface AssetFormFieldsProps {
  newAsset: Partial<Asset>;
  setNewAsset: (asset: Partial<Asset>) => void;
  availableSlots: SlotInfo[];
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
  const slotOptions = availableSlots.map(slot => ({
    value: slot.id,
    label: slot.name
  }));

  return (
    <div className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="make">Make *</Label>
        <Input
          id="make"
          value={newAsset.make || ''}
          onChange={(e) => setNewAsset({ ...newAsset, make: e.target.value })}
          placeholder="Enter RV make"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="model">Model *</Label>
        <Input
          id="model"
          value={newAsset.model || ''}
          onChange={(e) => setNewAsset({ ...newAsset, model: e.target.value })}
          placeholder="Enter RV model"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          value={newAsset.year || ''}
          onChange={(e) => setNewAsset({ ...newAsset, year: parseInt(e.target.value) || null })}
          placeholder="Enter RV year"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="site_id">Site *</Label>
        <SelectField
          value={newAsset.site_id || ''}
          onChange={(value) => setNewAsset({ ...newAsset, site_id: value })}
          options={slotOptions}
          placeholder="Select a site"
        />
      </div>
    </div>
  );
}
