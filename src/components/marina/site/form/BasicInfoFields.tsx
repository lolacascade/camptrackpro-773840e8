import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteType } from "../types"

interface BasicInfoFieldsProps {
  name: string;
  onNameChange: (value: string) => void;
}

export function BasicInfoFields({ 
  name, 
  onNameChange,
}: BasicInfoFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Site Name/Number *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="e.g., Site 12, A-23"
          className="bg-white"
        />
      </div>
    </div>
  )
}