import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const navigate = useNavigate();

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type to search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Assets">
          <CommandItem onSelect={() => {
            navigate("/app/assets/1");
            onOpenChange(false);
          }}>
            <Search className="mr-2 h-4 w-4" />
            Asset #1
          </CommandItem>
          <CommandItem onSelect={() => {
            navigate("/app/assets/2");
            onOpenChange(false);
          }}>
            <Search className="mr-2 h-4 w-4" />
            Asset #2
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Maintenance">
          <CommandItem onSelect={() => {
            navigate("/app/maintenance/1");
            onOpenChange(false);
          }}>
            <Search className="mr-2 h-4 w-4" />
            Maintenance Request #1
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => {
            navigate("/app/maintenance/new");
            onOpenChange(false);
          }}>
            <Search className="mr-2 h-4 w-4" />
            Create Maintenance Request
          </CommandItem>
          <CommandItem onSelect={() => {
            navigate("/app/assets/new");
            onOpenChange(false);
          }}>
            <Search className="mr-2 h-4 w-4" />
            Register New Asset
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}