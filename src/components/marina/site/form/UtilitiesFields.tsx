import { FormSelect } from "@/components/common/FormSelect"
import type { HookupType, PowerOption, SurfaceType } from "../types"
import { HOOKUP_TYPE_OPTIONS, POWER_OPTIONS, SURFACE_TYPE_OPTIONS } from "../types"

interface UtilitiesFieldsProps {
  hookupType: HookupType
  powerOption: PowerOption
  surfaceType: SurfaceType
  onHookupTypeChange: (value: HookupType) => void
  onPowerOptionChange: (value: PowerOption) => void
  onSurfaceTypeChange: (value: SurfaceType) => void
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          id="hookup_type"
          label="Hookup Type"
          value={hookupType}
          onValueChange={onHookupTypeChange as (value: string) => void}
          options={HOOKUP_TYPE_OPTIONS}
          tabIndex={2}
        />
        <FormSelect
          id="power_option"
          label="Power Option"
          value={powerOption}
          onValueChange={onPowerOptionChange as (value: string) => void}
          options={POWER_OPTIONS}
          tabIndex={3}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          id="surface_type"
          label="Surface Type"
          value={surfaceType}
          onValueChange={onSurfaceTypeChange as (value: string) => void}
          options={SURFACE_TYPE_OPTIONS}
          tabIndex={4}
        />
      </div>
    </div>
  )
}