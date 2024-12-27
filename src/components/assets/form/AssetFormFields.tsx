import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asset } from "@/types/asset";
import { cn } from "@/lib/utils";

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
        <div className="relative">
          <select
            id="asset_type"
            value={newAsset.asset_type || ''}
            onChange={(e) => setNewAsset({ ...newAsset, asset_type: e.target.value })}
            className={cn(
              "w-full h-10 px-3 rounded-md border border-input bg-white text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <option value="" disabled>Select RV type</option>
            {ASSET_TYPES.map(({ value, label }) => (
              <option key={value} value={value} className="py-2">
                {label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="slip_id">Site *</Label>
        <div className="relative">
          <select
            id="slip_id"
            value={newAsset.slip_id?.toString() || ''}
            onChange={(e) => setNewAsset({ ...newAsset, slip_id: parseInt(e.target.value) })}
            className={cn(
              "w-full h-10 px-3 rounded-md border border-input bg-white text-sm",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              "disabled:cursor-not-allowed disabled:opacity-50"
            )}
          >
            <option value="" disabled>Select a site</option>
            {availableSlots.map((slot) => (
              <option key={slot.id} value={slot.id.toString()} className="py-2">
                {slot.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}