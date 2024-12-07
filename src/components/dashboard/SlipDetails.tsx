import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SlipDetailsProps {
  slip: any; // We'll properly type this later
}

export function SlipDetails({ slip }: SlipDetailsProps) {
  return (
    <TooltipProvider key={slip.id}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={`rounded-lg p-4 cursor-help ${
              slip.status === "occupied"
                ? "bg-primary/10"
                : slip.status === "available"
                ? "bg-success/10"
                : "bg-warning/10"
            }`}
          >
            <div className="font-bold text-[#133134] text-base">{slip.name}</div>
            <div className="text-base text-[#3E4238]">
              {slip.dock_number} - {slip.power_connection_type || 'No power'}
            </div>
            <div className="mt-1 text-base capitalize text-[#3E4238]">
              {slip.status}
            </div>
            {slip.last_activity_at && (
              <div className="text-base text-[#3E4238] mt-1">
                Last activity: {new Date(slip.last_activity_at).toLocaleString()}
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-2 text-base">
            <p><strong>Status:</strong> {slip.status}</p>
            <p><strong>Power:</strong> {slip.power_connection_type || 'None'}</p>
            {slip.boats?.[0] && (
              <>
                <p><strong>Boat:</strong> {slip.boats[0].boat_name}</p>
                <p><strong>Owner:</strong> {slip.boats[0].customers?.name}</p>
              </>
            )}
            <p><strong>Last Activity:</strong> {slip.last_activity_at 
              ? new Date(slip.last_activity_at).toLocaleString()
              : 'No recent activity'}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}