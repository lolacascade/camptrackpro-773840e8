import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BasicInfoSectionProps {
  formData: any;
  onInputChange: (section: string, field: string, value: any) => void;
}

export function BasicInfoSection({ formData, onInputChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Marina Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => onInputChange('name', '', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange('address', '', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact_email">Contact Email</Label>
        <Input
          id="contact_email"
          type="email"
          value={formData.contact_email}
          onChange={(e) => onInputChange('contact_email', '', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="contact_phone">Contact Phone</Label>
        <Input
          id="contact_phone"
          value={formData.contact_phone}
          onChange={(e) => onInputChange('contact_phone', '', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="total_slips">Total Slips</Label>
        <Input
          id="total_slips"
          type="number"
          value={formData.total_slips || ''}
          onChange={(e) => onInputChange('total_slips', '', e.target.value)}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={formData.website}
          onChange={(e) => onInputChange('website', '', e.target.value)}
        />
      </div>
    </div>
  );
}