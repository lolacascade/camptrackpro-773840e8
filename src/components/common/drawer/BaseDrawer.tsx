
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { BaseDrawerProps } from "./types/drawer";
import { DrawerHeader } from "./components/DrawerHeader";
import { DrawerContent } from "./components/DrawerContent";

export function BaseDrawer({ 
  open, 
  onClose, 
  title, 
  children,
  className 
}: BaseDrawerProps) {
  return (
    <Sheet 
      open={open} 
      onOpenChange={onClose}
      modal={true}
    >
      <SheetContent 
        className={cn(
          "w-full sm:max-w-[720px] overflow-y-auto",
          "focus-visible:outline-none",
          className
        )}
        onInteractOutside={(e) => {
          e.preventDefault();
          onClose();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          onClose();
        }}
      >
        <DrawerHeader title={title} />
        <DrawerContent>
          {children}
        </DrawerContent>
      </SheetContent>
    </Sheet>
  );
}
