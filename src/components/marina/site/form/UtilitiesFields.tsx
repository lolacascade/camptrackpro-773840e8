import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HookupType, PowerOption, SurfaceType } from "../types"

interface UtilitiesFieldsProps {
  hookupType: HookupType;
  powerOption: PowerOption;
  surfaceType: SurfaceType;
  onHookupTypeChange: (value: HookupType) => void;
  onPowerOptionChange: (value: PowerOption) => void;
  onSurfaceTypeChange: (value: SurfaceType) => void;
}

const HOOKUP_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'full', label: 'Full Hookup (Water, Electric, Sewer)' },
  { value: 'partial', label: 'Partial Hookup (Water, Electric)' },
  { value: 'dry', label: 'Dry Site (No utilities)' }
];

const POWER_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: '20A', label: '20 AMP' },
  { value: '30A', label: '30 AMP' },
  { value: '50A', label: '50 AMP' }
];

const SURFACE_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'asphalt', label: 'Asphalt' },
  { value: 'grass', label: 'Grass' },
  { value: 'dirt', label: 'Dirt' }
];

export function UtilitiesFields({
  hookupType,
  powerOption,
  surfaceType,
  onHookupTypeChange,
  onPowerOptionChange,
  onSurfaceTypeChange
}: UtilitiesFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="hookup_type">Hookup Type *</Label>
        <Select
          value={hookupType}
          onValueChange={(value) => onHookupTypeChange(value as HookupType)}
        >
          <SelectTrigger id="hookup_type" className="bg-white">
            <SelectValue placeholder="Select hookup type" />
          </SelectTrigger>
          <SelectContent>
            {HOOKUP_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="power">Power Options *</Label>
        <Select
          value={powerOption}
          onValueChange={(value) => onPowerOptionChange(value as PowerOption)}
        >
          <SelectTrigger id="power" className="bg-white">
            <SelectValue placeholder="Select power option" />
          </SelectTrigger>
          <SelectContent>
            {POWER_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="surface">Surface Type *</Label>
        <Select
          value={surfaceType}
          onValueChange={(value) => onSurfaceTypeChange(value as SurfaceType)}
        >
          <SelectTrigger id="surface" className="bg-white">
            <SelectValue placeholder="Select surface type" />
          </SelectTrigger>
          <SelectContent>
            {SURFACE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}