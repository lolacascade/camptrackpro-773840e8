import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SocialMediaSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function SocialMediaSection({ formData, handleInputChange }: SocialMediaSectionProps) {
  return (
    <AccordionItem value="social" className="border rounded-lg bg-white shadow-sm">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span>Social Media Links</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
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