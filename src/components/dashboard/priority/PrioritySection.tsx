import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PriorityCard } from "./PriorityCard";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp } from "lucide-react";

const PRIORITY_FILTERS = ["all", "overdue", "vip", "maintenance"] as const;
type PriorityFilter = typeof PRIORITY_FILTERS[number];

export function PrioritySection() {
  const [filter, setFilter] = useState<PriorityFilter>("all");
  const [isOpen, setIsOpen] = useState(true);
  const { toast } = useToast();

  const priorityItems = [
    {
      type: "overdue" as const,
      title: "Overdue Check-out",
      description: "Boat 'Sea Spirit' in Slip A1 is 2 days overdue",
      action: {
        label: "Process Check-out",
        variant: "destructive" as const,
        onClick: () => {
          toast({
            title: "Processing check-out",
            description: "Initiating check-out process for Sea Spirit",
          });
        },
      },
    },
    {
      type: "vip" as const,
      title: "VIP Arrival",
      description: "John Smith arriving at 2:00 PM - Preferred slip B3",
      action: {
        label: "Review Details",
        onClick: () => {
          toast({
            title: "VIP Details",
            description: "Opening VIP arrival details",
          });
        },
      },
    },
    {
      type: "maintenance" as const,
      title: "Urgent Maintenance",
      description: "Electrical issue reported in Dock C",
      action: {
        label: "Schedule Repair",
        onClick: () => {
          toast({
            title: "Maintenance Scheduled",
            description: "Creating maintenance ticket for Dock C",
          });
        },
      },
    },
  ];

  const filteredItems = priorityItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {PRIORITY_FILTERS.map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f)}
              className="capitalize"
            >
              {f}
            </Button>
          ))}
        </div>
        <CollapsibleTrigger asChild onClick={() => setIsOpen(!isOpen)}>
          <Button variant="ghost" size="sm">
            {isOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
      </div>

      <Collapsible open={isOpen}>
        <CollapsibleContent>
          <div className="grid gap-4 md:grid-cols-3">
            {filteredItems.map((item, index) => (
              <PriorityCard key={index} {...item} />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}