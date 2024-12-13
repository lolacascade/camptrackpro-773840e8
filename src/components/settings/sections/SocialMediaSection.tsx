import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SocialMediaSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function SocialMediaSection({ formData, handleInputChange }: SocialMediaSectionProps) {
  const isFieldComplete = (value: any) => value && value.toString().trim() !== '';
  const completedFields = Object.values(formData.social_media).filter(isFieldComplete).length;
  const totalFields = Object.keys(formData.social_media).length;

  return (
    <AccordionItem value="social" className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <AccordionTrigger className="px-4 py-4 hover:no-underline bg-white hover:bg-gray-50/80">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#133134] font-medium">Social Media Links</span>
          <span className="text-sm text-muted-foreground">
            {completedFields}/{totalFields} fields completed
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 bg-white">
        <div className="grid gap-4">
          {Object.entries(formData.social_media).map(([platform, value]) => (
            <div key={platform} className="grid gap-2">
              <Label htmlFor={platform} className="text-sm font-medium">
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </Label>
              <Input
                id={platform}
                type="url"
                value={value as string}
                onChange={(e) => 
                  handleInputChange('social_media', platform, e.target.value)
                }
                placeholder={`Enter ${platform} URL`}
                className="border-input"
              />
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}