import { FormSelect } from "@/components/common/FormSelect"

interface UtilitiesFieldsProps {
  hookupType: string
  powerOption: string
  surfaceType: string
  onHookupTypeChange: (value: string) => void
  onPowerOptionChange: (value: string) => void
  onSurfaceTypeChange: (value: string) => void
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
          label="Site Type"
          value={hookupType}
          onChange={onHookupTypeChange}
          options={[
            { value: "No Selection", label: "Select Site Type" },
            { value: "Full Hookup", label: "Full Hookup" },
            { value: "Partial Hookup", label: "Partial Hookup" },
            { value: "No Hookup", label: "No Hookup" }
          ]}
          tabIndex={2}
        />
        <FormSelect
          label="Hookup Type"
          value={powerOption}
          onChange={onPowerOptionChange}
          options={[
            { value: "No Selection", label: "Select Hookup Type" },
            { value: "30 AMP", label: "30 AMP" },
            { value: "50 AMP", label: "50 AMP" },
            { value: "Both", label: "Both" }
          ]}
          tabIndex={3}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          label="Power Options"
          value={powerOption}
          onChange={onPowerOptionChange}
          options={[
            { value: "No Selection", label: "Select Power Option" },
            { value: "30 AMP", label: "30 AMP" },
            { value: "50 AMP", label: "50 AMP" },
            { value: "Both", label: "Both" }
          ]}
          tabIndex={4}
        />
        <FormSelect
          label="Surface Type"
          value={surfaceType}
          onChange={onSurfaceTypeChange}
          options={[
            { value: "No Selection", label: "Select Surface Type" },
            { value: "Concrete", label: "Concrete" },
            { value: "Gravel", label: "Gravel" },
            { value: "Grass", label: "Grass" },
            { value: "Dirt", label: "Dirt" }
          ]}
          tabIndex={5}
        />
      </div>
    </div>
  )
}