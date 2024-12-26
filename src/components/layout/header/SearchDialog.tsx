import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Command, CommandInput } from "cmdk";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <Command className="rounded-lg border shadow-md">
          <CommandInput 
            placeholder="Type a command or search..." 
            className="h-12"
          />
        </Command>
      </DialogContent>
    </Dialog>
  );
}