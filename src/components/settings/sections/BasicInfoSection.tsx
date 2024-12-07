import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function BasicInfoSection({ formData, handleInputChange }: BasicInfoSectionProps) {
  return (
    <AccordionItem value="basic">
      <AccordionTrigger>Basic Information</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="marina-name">Marina Name</Label>
            <Input
              id="marina-name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', '', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="marina-address">Address</Label>
            <Textarea
              id="marina-address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', '', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="marina-phone">Phone</Label>
            <Input
              id="marina-phone"
              value={formData.contact_phone}
              onChange={(e) => handleInputChange('contact_phone', '', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="marina-email">Email</Label>
            <Input
              id="marina-email"
              type="email"
              value={formData.contact_email}
              onChange={(e) => handleInputChange('contact_email', '', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="marina-website">Website</Label>
            <Input
              id="marina-website"
              type="url"
              value={formData.website}
              onChange={(e) => handleInputChange('website', '', e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="marina-capacity">Total Slips</Label>
            <Input
              id="marina-capacity"
              type="number"
              value={formData.total_slips || ''}
              onChange={(e) => handleInputChange('total_slips', '', e.target.value)}
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}