import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavigationLinks } from "./NavigationLinks";
import { Logo } from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileMenu({ isOpen, onOpenChange }: MobileMenuProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-white">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-[300px] bg-[#0D1D1F] p-6 border-r border-[rgba(255,255,255,0.1)]"
      >
        <div className="flex flex-col gap-8">
          <Logo />
          <NavigationLinks 
            className="flex flex-col gap-4" 
            onItemClick={() => onOpenChange(false)} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}