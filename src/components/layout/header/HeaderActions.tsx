
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderActionsProps {}

export function HeaderActions({}: HeaderActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-primary hover:bg-transparent"
        onClick={() => navigate('/app/settings')}
      >
        <Settings className="h-5 w-5" />
      </Button>
    </div>
  );
}
