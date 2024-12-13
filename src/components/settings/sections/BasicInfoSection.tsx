import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface BasicInfoSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function BasicInfoSection({ formData, handleInputChange }: BasicInfoSectionProps) {
  const isFieldComplete = (value: any) => value && value.toString().trim() !== '';

  const completedFields = Object.values(formData).filter(isFieldComplete).length;
  const totalFields = Object.keys(formData).length;

  return (
    <AccordionItem value="basic" className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <AccordionTrigger className="px-4 py-4 hover:no-underline bg-white hover:bg-gray-50/80">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#133134] font-medium">Basic Information</span>
          <span className="text-sm text-muted-foreground">
            {completedFields}/{totalFields} fields completed
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 bg-white">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="marina-name" className="flex items-center space-x-2">
              <span>Marina Name</span>
              {!isFieldComplete(formData.name) && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Required field</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </Label>
            <Input
              id="marina-name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', '', e.target.value)}
              className="border-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="marina-address">Address</Label>
            <Textarea
              id="marina-address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', '', e.target.value)}
              className="min-h-[100px]"
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