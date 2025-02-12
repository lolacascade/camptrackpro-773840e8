
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { DrawerHeaderProps } from "../types/drawer";

export function DrawerHeader({ title }: DrawerHeaderProps) {
  return (
    <SheetHeader>
      <SheetTitle>{title}</SheetTitle>
    </SheetHeader>
  );
}
