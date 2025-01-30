import { Bell, Plus, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderActionsProps {
  onSearchOpen: () => void;
  onNotificationOpen: () => void;
}

export function HeaderActions({ onSearchOpen, onNotificationOpen }: HeaderActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSearchOpen}
        className="text-white hover:text-primary hover:bg-transparent"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Button 
        variant="ghost" 
        size="icon"
        className="relative text-white hover:text-primary hover:bg-transparent"
        onClick={onNotificationOpen}
      >
        <Bell className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-primary hover:bg-transparent"
        onClick={() => navigate('/app/settings')}
      >
        <Settings className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="text-white hover:text-primary hover:bg-transparent"
      >
        <Plus className="h-5 w-5" />
      </Button>
    </div>
  );
}