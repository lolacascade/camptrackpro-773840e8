import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface SocialMediaSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function SocialMediaSection({ formData, handleInputChange }: SocialMediaSectionProps) {
  return (
    <AccordionItem value="social">
      <AccordionTrigger>Social Media Links</AccordionTrigger>
      <AccordionContent>
        <div className="grid gap-4">
          {Object.entries(formData.social_media).map(([platform, value]) => (
            <div key={platform} className="grid gap-2">
              <Label htmlFor={platform}>
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
              />
            </div>
          ))}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}