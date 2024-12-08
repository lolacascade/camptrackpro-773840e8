import { Bell, Search, Settings } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { NotificationDrawer } from "@/components/notifications/NotificationDrawer";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/" },
  { name: "Marina Map", href: "/map" },
  { name: "Customers", href: "/customers" },
  { name: "Boats", href: "/boats" },
  { name: "Maintenance", href: "/maintenance" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  return (
    <div className="flex h-16 items-center justify-between px-4 bg-background">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          <span className="text-primary">Dock</span>
          <span className="text-secondary">Ease</span>
        </Link>
      </div>
      
      <div className="flex items-center">
        <nav className="flex items-center mr-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors relative px-3",
                "after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:transition-transform after:duration-300 hover:after:origin-bottom-left hover:after:scale-x-100",
                location.pathname === item.href
                  ? "text-primary after:scale-x-100 after:bg-primary"
                  : "text-secondary hover:text-primary after:bg-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="text-secondary hover:text-primary hover:bg-transparent"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="relative text-secondary hover:text-primary hover:bg-transparent"
            onClick={() => setNotificationOpen(true)}
          >
            <Bell className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-secondary hover:text-primary hover:bg-transparent"
            onClick={() => navigate('/settings')}
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type to search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Boats">
            <CommandItem onSelect={() => {
              navigate("/boats/1");
              setOpen(false);
            }}>
              <Search className="mr-2 h-4 w-4" />
              Boat #1 - Sailboat
            </CommandItem>
            <CommandItem onSelect={() => {
              navigate("/boats/2");
              setOpen(false);
            }}>
              <Search className="mr-2 h-4 w-4" />
              Boat #2 - Yacht
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Maintenance">
            <CommandItem onSelect={() => {
              navigate("/maintenance/1");
              setOpen(false);
            }}>
              <Search className="mr-2 h-4 w-4" />
              Maintenance Request #1
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Quick Actions">
            <CommandItem onSelect={() => {
              navigate("/maintenance/new");
              setOpen(false);
            }}>
              <Search className="mr-2 h-4 w-4" />
              Create Maintenance Request
            </CommandItem>
            <CommandItem onSelect={() => {
              navigate("/boats/new");
              setOpen(false);
            }}>
              <Search className="mr-2 h-4 w-4" />
              Register New Boat
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <NotificationDrawer
        open={notificationOpen}
        onOpenChange={setNotificationOpen}
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
}