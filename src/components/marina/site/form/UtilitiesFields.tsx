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
          <SelectTrigger>
            <SelectValue placeholder="Select hookup type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No Selection</SelectItem>
            <SelectItem value="full">Full Hookup (Water, Electric, Sewer)</SelectItem>
            <SelectItem value="partial">Partial Hookup (Water, Electric)</SelectItem>
            <SelectItem value="dry">Dry Site (No utilities)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="power">Power Options *</Label>
        <Select
          value={powerOption}
          onValueChange={(value) => onPowerOptionChange(value as PowerOption)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select power option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No Selection</SelectItem>
            <SelectItem value="20A">20 AMP</SelectItem>
            <SelectItem value="30A">30 AMP</SelectItem>
            <SelectItem value="50A">50 AMP</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="surface">Surface Type *</Label>
        <Select
          value={surfaceType}
          onValueChange={(value) => onSurfaceTypeChange(value as SurfaceType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select surface type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">No Selection</SelectItem>
            <SelectItem value="gravel">Gravel</SelectItem>
            <SelectItem value="concrete">Concrete</SelectItem>
            <SelectItem value="asphalt">Asphalt</SelectItem>
            <SelectItem value="grass">Grass</SelectItem>
            <SelectItem value="dirt">Dirt</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}