
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RV } from "@/types/rv";

interface RVFormFieldsProps {
  newRV: Partial<RV>;
  setNewRV: (rv: Partial<RV>) => void;
}

export function RVFormFields({ newRV, setNewRV }: RVFormFieldsProps) {
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
    </div>
  );
}
