
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteFormData } from "@/types/site";

interface SiteFormFieldsProps {
  formData: SiteFormData;
  setFormData: (data: SiteFormData) => void;
}

export function SiteFormFields({ formData, setFormData }: SiteFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter site name"
          className="bg-white"
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          placeholder="Enter location"
          className="bg-white"
        />
      </div>
    </div>
  );
}
