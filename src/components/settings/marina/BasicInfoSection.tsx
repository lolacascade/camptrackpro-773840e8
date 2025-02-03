import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MarinaFormData } from "@/types/marina";

interface BasicInfoSectionProps {
  formData: MarinaFormData;
  handleInputChange: (e: any) => void;
}

export function BasicInfoSection({ formData, handleInputChange }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Basic Information</h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Marina Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={formData.website}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_email">Contact Email</Label>
          <Input
            id="contact_email"
            name="contact_email"
            type="email"
            value={formData.contact_email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_phone">Contact Phone</Label>
          <Input
            id="contact_phone"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="total_slips">Total Slips</Label>
          <Input
            id="total_slips"
            name="total_slips"
            type="number"
            value={formData.total_slips}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
}