import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ProfileCompletionProps {
  completionPercentage: number;
  onNavigateToSection: (section: string) => void;
}

export function ProfileCompletion({ completionPercentage, onNavigateToSection }: ProfileCompletionProps) {
  const sections = ['Basic Information', 'Location', 'Services', 'Features'];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex justify-between text-sm cursor-help">
                <span>Profile Completion</span>
                <span>{Math.round(completionPercentage)}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              <p>
                Complete all sections including Basic Information, 
                Location Coordinates, and Services to reach 100%
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <Progress 
          value={completionPercentage} 
          className="h-2 bg-[#133134]/10 transition-all duration-500"
          style={{
            background: 'linear-gradient(to right, #133134, #C0CCAB)',
            backgroundSize: `${completionPercentage}% 100%`,
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-[#133134]">Quick Access</h3>
        <div className="grid grid-cols-2 gap-2">
          {sections.map((section) => (
            <Button
              key={section}
              variant="outline"
              size="sm"
              className="text-sm justify-start"
              onClick={() => onNavigateToSection(section.toLowerCase())}
            >
              {section}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}