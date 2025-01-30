import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset, RV_TYPE_TO_CATEGORY } from "@/types/asset";
import { SelectField } from "@/components/common/FormFields/SelectField";

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

export const PRICING_CATEGORIES = [
  { value: 'up_to_15', label: 'Up to 15\'' },
  { value: 'up_to_20', label: 'Up to 20\'' },
  { value: 'up_to_30', label: 'Up to 30\'' },
  { value: 'up_to_35', label: 'Up to 35\'' },
  { value: 'up_to_40', label: 'Up to 40\'' },
];

export function AssetFormFields({ newAsset, setNewAsset, availableSlots }: AssetFormFieldsProps) {
  const slotOptions = availableSlots.map(slot => ({
    value: slot.id.toString(),
    label: slot.name
  }));

  const handleAssetTypeChange = (value: string) => {
    const pricing_category = RV_TYPE_TO_CATEGORY[value];
    setNewAsset({ 
      ...newAsset, 
      asset_type: value,
      pricing_category: pricing_category // Auto-set pricing category based on RV type
    });
  };

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
        <Label htmlFor="asset_size">Size</Label>
        <Input
          id="asset_size"
          value={newAsset.asset_size || ''}
          onChange={(e) => setNewAsset({ ...newAsset, asset_size: e.target.value })}
          placeholder="e.g., 32 ft"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="asset_type">RV Type</Label>
        <SelectField
          value={newAsset.asset_type || ''}
          onChange={handleAssetTypeChange}
          options={ASSET_TYPES.map(({ value, label }) => ({ value, label }))}
          placeholder="Select RV type"
        />
      </div>
      {newAsset.asset_type === 'Other' && (
        <div className="grid gap-2">
          <Label htmlFor="pricing_category">Pricing Category *</Label>
          <SelectField
            value={newAsset.pricing_category || ''}
            onChange={(value) => setNewAsset({ ...newAsset, pricing_category: value as any })}
            options={PRICING_CATEGORIES}
            placeholder="Select pricing category"
          />
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor="site_id">Site *</Label>
        <SelectField
          value={newAsset.site_id?.toString() || ''}
          onChange={(value) => setNewAsset({ ...newAsset, site_id: parseInt(value) })}
          options={slotOptions}
          placeholder="Select a site"
        />
      </div>
    </div>
  );
}