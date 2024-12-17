import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MaxCapacity } from "../types"

interface CapacityFieldsProps {
  capacity: MaxCapacity;
  onCapacityChange: (capacity: MaxCapacity) => void;
}

export function CapacityFields({ capacity, onCapacityChange }: CapacityFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="max_people">Max People</Label>
          <Input
            id="max_people"
            type="number"
            value={capacity.people}
            onChange={(e) => onCapacityChange({ 
              ...capacity, 
              people: parseInt(e.target.value) 
            })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="max_vehicles">Max Vehicles</Label>
          <Input
            id="max_vehicles"
            type="number"
            value={capacity.vehicles}
            onChange={(e) => onCapacityChange({ 
              ...capacity, 
              vehicles: parseInt(e.target.value) 
            })}
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="max_weight">Max Weight (lbs)</Label>
        <Input
          id="max_weight"
          type="number"
          value={capacity.weight || ''}
          onChange={(e) => onCapacityChange({ 
            ...capacity, 
            weight: parseInt(e.target.value) 
          })}
          placeholder="Optional"
        />
      </div>
    </div>
  )
}