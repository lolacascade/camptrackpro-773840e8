import { FormSelect } from "@/components/common/FormSelect"
import type { HookupType, PowerOption, SurfaceType } from "../types"
import { HOOKUP_TYPE_OPTIONS, POWER_OPTIONS, SURFACE_TYPE_OPTIONS } from "../types"

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
  const handleValueChange = (setter: (value: any) => void) => (value: string) => {
    setter(value === 'none' ? null : value);
  };

  const getValue = (value: string | null) => value || 'none';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          id="site_type"
          label="Site Type *"
          value={getValue(hookupType)}
          onValueChange={handleValueChange(onHookupTypeChange)}
          options={HOOKUP_TYPE_OPTIONS}
          tabIndex={2}
        />
        <FormSelect
          id="hookup_type"
          label="Hookup Type"
          value={getValue(hookupType)}
          onValueChange={handleValueChange(onHookupTypeChange)}
          options={HOOKUP_TYPE_OPTIONS}
          tabIndex={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          id="power_option"
          label="Power Option"
          value={getValue(powerOption)}
          onValueChange={handleValueChange(onPowerOptionChange)}
          options={POWER_OPTIONS}
          tabIndex={3}
        />
        <FormSelect
          id="surface_type"
          label="Surface Type"
          value={getValue(surfaceType)}
          onValueChange={handleValueChange(onSurfaceTypeChange)}
          options={SURFACE_TYPE_OPTIONS}
          tabIndex={4}
        />
      </div>
    </div>
  );
}