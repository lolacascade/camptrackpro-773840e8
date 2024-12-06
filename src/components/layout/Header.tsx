import { Bell, Search } from "lucide-react";
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
  { name: "Settings", href: "/settings" },
];

// Mock notifications - in a real app, this would come from an API
const mockNotifications = [
  {
    id: "1",
    title: "New Maintenance Request",
    message: "Boat #123 requires urgent maintenance",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    read: false,
  },
  {
    id: "2",
    title: "Payment Received",
    message: "Payment for slip B12 has been processed",
    date: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    read: false,
  },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();
  const location = useLocation();

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

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

  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-primary">DockEase</h1>
        <Button
          variant="outline"
          className="relative h-9 w-60 justify-start text-sm text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4" />
          Search...
          <kbd className="pointer-events-none absolute right-2 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>
      
      <div className="flex items-center gap-6">
        <nav className="flex items-center space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <Button 
          variant="ghost" 
          size="icon"
          className="relative"
          onClick={() => setNotificationOpen(true)}
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
          )}
        </Button>
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