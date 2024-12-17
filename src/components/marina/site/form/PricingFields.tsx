import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pricing } from "../types"

interface PricingFieldsProps {
  pricing: Pricing;
  onPricingChange: (pricing: Pricing) => void;
}

export function PricingFields({ pricing, onPricingChange }: PricingFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="nightly">Nightly Rate ($)</Label>
          <Input
            id="nightly"
            type="number"
            value={pricing.nightly}
            onChange={(e) => onPricingChange({ 
              ...pricing, 
              nightly: parseFloat(e.target.value) 
            })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="weekly">Weekly Rate ($)</Label>
          <Input
            id="weekly"
            type="number"
            value={pricing.weekly}
            onChange={(e) => onPricingChange({ 
              ...pricing, 
              weekly: parseFloat(e.target.value) 
            })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="monthly">Monthly Rate ($)</Label>
          <Input
            id="monthly"
            type="number"
            value={pricing.monthly}
            onChange={(e) => onPricingChange({ 
              ...pricing, 
              monthly: parseFloat(e.target.value) 
            })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="annual">Annual Rate ($)</Label>
          <Input
            id="annual"
            type="number"
            value={pricing.annual || ''}
            onChange={(e) => onPricingChange({ 
              ...pricing, 
              annual: parseFloat(e.target.value) 
            })}
            placeholder="Optional"
          />
        </div>
      </div>
    </div>
  )
}