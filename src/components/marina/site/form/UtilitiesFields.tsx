import { SelectField } from "@/components/common/FormFields/SelectField";
import type { HookupType, PowerOption, SurfaceType, SiteType } from "../types";
import { HOOKUP_TYPE_OPTIONS, POWER_OPTIONS, SURFACE_TYPE_OPTIONS, SITE_TYPE_OPTIONS } from "../types";

interface UtilitiesFieldsProps {
  hookupType: HookupType;
  powerOption: PowerOption;
  surfaceType: SurfaceType;
  siteType: string | null;
  onHookupTypeChange: (value: HookupType) => void;
  onPowerOptionChange: (value: PowerOption) => void;
  onSurfaceTypeChange: (value: SurfaceType) => void;
  onSiteTypeChange: (value: string) => void;
}

export function UtilitiesFields({
  hookupType,
  powerOption,
  surfaceType,
  siteType,
  onHookupTypeChange,
  onPowerOptionChange,
  onSurfaceTypeChange,
  onSiteTypeChange
}: UtilitiesFieldsProps) {
  const handleValueChange = (setter: (value: any) => void) => (value: string) => {
    setter(value === 'none' ? null : value);
  };

  const getValue = (value: string | null) => value || 'none';

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="site_type"
          value={getValue(siteType)}
          onChange={handleValueChange(onSiteTypeChange)}
          options={SITE_TYPE_OPTIONS}
          placeholder="Select site type"
        />
        <SelectField
          name="hookup_type"
          value={getValue(hookupType)}
          onChange={handleValueChange(onHookupTypeChange)}
          options={HOOKUP_TYPE_OPTIONS}
          placeholder="Select hookup type"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <SelectField
          name="power_option"
          value={getValue(powerOption)}
          onChange={handleValueChange(onPowerOptionChange)}
          options={POWER_OPTIONS}
          placeholder="Select power option"
        />
        <SelectField
          name="surface_type"
          value={getValue(surfaceType)}
          onChange={handleValueChange(onSurfaceTypeChange)}
          options={SURFACE_TYPE_OPTIONS}
          placeholder="Select surface type"
        />
      </div>
    </div>
  );
}