
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RV } from "@/types/rv";
import { SelectField } from "@/components/common/FormFields/SelectField";

interface RVFormFieldsProps {
  newRV: Partial<RV>;
  setNewRV: (rv: Partial<RV>) => void;
  availableSlots: { value: string; label: string; }[];
}

export function RVFormFields({ newRV, setNewRV, availableSlots }: RVFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Make</Label>
        <Input
          value={newRV.make || ''}
          onChange={(e) => setNewRV({ ...newRV, make: e.target.value })}
          placeholder="Enter make"
          className="bg-white"
        />
      </div>

      <div>
        <Label>Model</Label>
        <Input
          value={newRV.model || ''}
          onChange={(e) => setNewRV({ ...newRV, model: e.target.value })}
          placeholder="Enter model"
          className="bg-white"
        />
      </div>

      <div>
        <Label>Year</Label>
        <Input
          type="number"
          value={newRV.year || ''}
          onChange={(e) => setNewRV({ ...newRV, year: parseInt(e.target.value) || null })}
          placeholder="Enter year"
          className="bg-white"
        />
      </div>

      <div>
        <Label>Site</Label>
        <SelectField
          value={newRV.site_id || ''}
          onChange={(value) => setNewRV({ ...newRV, site_id: value })}
          options={availableSlots}
          placeholder="Select site"
        />
      </div>
    </div>
  );
}
