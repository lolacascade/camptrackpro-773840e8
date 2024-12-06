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
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
      <div className="flex items-center gap-4">
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
      
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <div className="h-8 w-8 rounded-full bg-primary/10" />
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
    </div>
  );
}