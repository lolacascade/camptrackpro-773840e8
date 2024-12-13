import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ApproachSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function ApproachSection({ formData, handleInputChange }: ApproachSectionProps) {
  const isFieldComplete = (value: any) => value && value.toString().trim() !== '';
  const completedFields = Object.values(formData.approach_info).filter(isFieldComplete).length;
  const totalFields = Object.keys(formData.approach_info).length;

  return (
    <AccordionItem value="approach" className="border rounded-lg bg-white shadow-sm overflow-hidden">
      <AccordionTrigger className="px-4 py-4 hover:no-underline bg-white hover:bg-gray-50/80">
        <div className="flex items-center justify-between w-full">
          <span className="text-[#133134] font-medium">Approach Information</span>
          <span className="text-sm text-muted-foreground">
            {completedFields}/{totalFields} fields completed
          </span>
        </div>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4 pt-2 bg-white">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="min-approach-depth">Minimum Approach Depth</Label>
            <Input
              id="min-approach-depth"
              value={formData.approach_info.min_approach_depth}
              onChange={(e) => handleInputChange('approach_info', 'min_approach_depth', e.target.value)}
              className="border-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="min-channel-depth">Minimum Channel Depth</Label>
            <Input
              id="min-channel-depth"
              value={formData.approach_info.min_channel_depth}
              onChange={(e) => handleInputChange('approach_info', 'min_channel_depth', e.target.value)}
              className="border-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mean-low-water">Mean Low Water Dock Depth</Label>
            <Input
              id="mean-low-water"
              value={formData.approach_info.mean_low_water_depth}
              onChange={(e) => handleInputChange('approach_info', 'mean_low_water_depth', e.target.value)}
              className="border-input"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mean-high-water">Mean High Water Clearance</Label>
            <Input
              id="mean-high-water"
              value={formData.approach_info.mean_high_water_clearance}
              onChange={(e) => handleInputChange('approach_info', 'mean_high_water_clearance', e.target.value)}
              className="border-input"
            />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}