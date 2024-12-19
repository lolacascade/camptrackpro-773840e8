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
  { value: '20A', label: '20 AMP Service' },
  { value: '30A', label: '30 AMP Service' },
  { value: '50A', label: '50 AMP Service' },
  { value: 'dual30_50', label: 'Dual 30/50 AMP Service' }
];

const SURFACE_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'asphalt', label: 'Asphalt' },
  { value: 'grass', label: 'Grass' },
  { value: 'dirt', label: 'Dirt' }
];

const SITE_TYPE_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'pull-through', label: 'Pull-Through Site' },
  { value: 'back-in', label: 'Back-In Site' },
  { value: 'tent-only', label: 'Tent Only Site' },
  { value: 'waterfront', label: 'Waterfront Site' }
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
        <Label htmlFor="site_type">Site Type *</Label>
        <Select
          value={hookupType}
          onValueChange={(value) => onHookupTypeChange(value as HookupType)}
        >
          <SelectTrigger id="site_type" className="w-full bg-white">
            <SelectValue placeholder="Select site type" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border border-gray-200 shadow-lg"
            position="popper"
            sideOffset={5}
          >
            {SITE_TYPE_OPTIONS.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="hookup_type">Hookup Type *</Label>
        <Select
          value={hookupType}
          onValueChange={(value) => onHookupTypeChange(value as HookupType)}
        >
          <SelectTrigger id="hookup_type" className="w-full bg-white">
            <SelectValue placeholder="Select hookup type" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border border-gray-200 shadow-lg"
            position="popper"
            sideOffset={5}
          >
            {HOOKUP_OPTIONS.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="hover:bg-gray-100 cursor-pointer"
              >
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
          <SelectTrigger id="power" className="w-full bg-white">
            <SelectValue placeholder="Select power option" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border border-gray-200 shadow-lg"
            position="popper"
            sideOffset={5}
          >
            {POWER_OPTIONS.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="hover:bg-gray-100 cursor-pointer"
              >
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
          <SelectTrigger id="surface" className="w-full bg-white">
            <SelectValue placeholder="Select surface type" />
          </SelectTrigger>
          <SelectContent 
            className="bg-white border border-gray-200 shadow-lg"
            position="popper"
            sideOffset={5}
          >
            {SURFACE_OPTIONS.map(option => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="hover:bg-gray-100 cursor-pointer"
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}