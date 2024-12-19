import { Label } from "@/components/ui/label"
import { FormSelect } from "@/components/common/FormSelect"
import { HookupType, PowerOption, SurfaceType } from "../types"

interface UtilitiesFieldsProps {
  hookupType: HookupType
  powerOption: PowerOption
  surfaceType: SurfaceType
  onHookupTypeChange: (value: HookupType) => void
  onPowerOptionChange: (value: PowerOption) => void
  onSurfaceTypeChange: (value: SurfaceType) => void
}

const SITE_TYPE_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'pull-through', label: 'Pull-Through Site' },
  { value: 'back-in', label: 'Back-In Site' },
  { value: 'tent-only', label: 'Tent Only Site' },
  { value: 'waterfront', label: 'Waterfront Site' }
]

const HOOKUP_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'full', label: 'Full Hookup (Water, Electric, Sewer)' },
  { value: 'partial', label: 'Partial Hookup (Water, Electric)' },
  { value: 'dry', label: 'Dry Site (No utilities)' }
]

const POWER_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: '20A', label: '20 AMP Service' },
  { value: '30A', label: '30 AMP Service' },
  { value: '50A', label: '50 AMP Service' },
  { value: 'dual30_50', label: 'Dual 30/50 AMP Service' }
]

const SURFACE_OPTIONS = [
  { value: 'No Selection', label: 'No Selection' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'concrete', label: 'Concrete' },
  { value: 'asphalt', label: 'Asphalt' },
  { value: 'grass', label: 'Grass' },
  { value: 'dirt', label: 'Dirt' }
]

export function UtilitiesFields({
  hookupType,
  powerOption,
  surfaceType,
  onHookupTypeChange,
  onPowerOptionChange,
  onSurfaceTypeChange
}: UtilitiesFieldsProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="site_type">Site Type *</Label>
        <FormSelect
          id="site_type"
          value={hookupType}
          onValueChange={(value) => onHookupTypeChange(value as HookupType)}
          options={SITE_TYPE_OPTIONS}
          placeholder="Select site type"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="hookup_type">Hookup Type *</Label>
        <FormSelect
          id="hookup_type"
          value={hookupType}
          onValueChange={(value) => onHookupTypeChange(value as HookupType)}
          options={HOOKUP_OPTIONS}
          placeholder="Select hookup type"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="power">Power Options *</Label>
        <FormSelect
          id="power"
          value={powerOption}
          onValueChange={(value) => onPowerOptionChange(value as PowerOption)}
          options={POWER_OPTIONS}
          placeholder="Select power option"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="surface">Surface Type *</Label>
        <FormSelect
          id="surface"
          value={surfaceType}
          onValueChange={(value) => onSurfaceTypeChange(value as SurfaceType)}
          options={SURFACE_OPTIONS}
          placeholder="Select surface type"
        />
      </div>
    </div>
  )
}