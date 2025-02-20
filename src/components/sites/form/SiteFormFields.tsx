
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Site } from "@/types/site";

interface SiteFormFieldsProps {
  site: Partial<Site>;
  setSite: (site: Partial<Site>) => void;
}

export function SiteFormFields({ site, setSite }: SiteFormFieldsProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input
          value={site.name || ''}
          onChange={(e) => setSite({ ...site, name: e.target.value })}
          placeholder="Enter site name"
          className="bg-white"
        />
      </div>

      <div>
        <Label>Location</Label>
        <Input
          value={site.location || ''}
          onChange={(e) => setSite({ ...site, location: e.target.value })}
          placeholder="Enter location"
          className="bg-white"
        />
      </div>
    </div>
  );
}
