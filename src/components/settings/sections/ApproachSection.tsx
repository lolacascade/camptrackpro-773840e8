import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface ApproachSectionProps {
  formData: any;
  handleInputChange: (section: string, field: string, value: any) => void;
}

export function ApproachSection({ formData, handleInputChange }: ApproachSectionProps) {
  return (
    <AccordionItem value="approach" className="border rounded-lg bg-white shadow-sm">
      <AccordionTrigger className="px-4 hover:no-underline">
        <span>Approach Information</span>
      </AccordionTrigger>
      <AccordionContent className="px-4 pb-4">
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