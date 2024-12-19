import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteType, SITE_TYPE_OPTIONS } from "../types"

interface BasicInfoFieldsProps {
  name: string;
  siteType: SiteType;
  onNameChange: (value: string) => void;
  onSiteTypeChange: (value: SiteType) => void;
}

export function BasicInfoFields({ 
  name, 
  siteType, 
  onNameChange, 
  onSiteTypeChange 
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
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="site_type">Site Type *</Label>
        <Select
          value={siteType}
          onValueChange={(value) => onSiteTypeChange(value as SiteType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select site type" />
          </SelectTrigger>
          <SelectContent>
            {SITE_TYPE_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}