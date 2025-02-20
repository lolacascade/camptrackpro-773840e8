
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset } from "@/types/asset";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { useAvailableSlots } from "../../hooks/useAvailableSlots";

interface AssetFormFieldsProps {
  asset: Partial<Asset>;
  onAssetChange: (asset: Partial<Asset>) => void;
}

export function AssetFormFields({ asset, onAssetChange }: AssetFormFieldsProps) {
  const availableSlots = useAvailableSlots();

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="make">Make <span className="text-red-500">*</span></Label>
        <Input
          id="make"
          value={asset.make || ''}
          onChange={(e) => onAssetChange({ ...asset, make: e.target.value })}
          className="bg-white"
        />
      </div>

      <div>
        <Label htmlFor="model">Model <span className="text-red-500">*</span></Label>
        <Input
          id="model"
          value={asset.model || ''}
          onChange={(e) => onAssetChange({ ...asset, model: e.target.value })}
          className="bg-white"
        />
      </div>

      <div>
        <Label htmlFor="year">Year</Label>
        <Input
          id="year"
          type="number"
          value={asset.year || ''}
          onChange={(e) => onAssetChange({ ...asset, year: parseInt(e.target.value) || null })}
          className="bg-white"
        />
      </div>

      <div>
        <Label htmlFor="site_id">Site</Label>
        <SelectField
          value={asset.site_id || ''}
          onChange={(value) => onAssetChange({ ...asset, site_id: value })}
          options={availableSlots.map(slot => ({
            value: slot.id,
            label: slot.name
          }))}
          placeholder="Select a site"
        />
      </div>
    </div>
  );
}
