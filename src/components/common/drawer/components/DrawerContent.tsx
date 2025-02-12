
import { cn } from "@/lib/utils";
import { DrawerContentProps } from "../types/drawer";

export function DrawerContent({ children, className }: DrawerContentProps) {
  return (
    <div className={cn("mt-4", className)}>
      {children}
    </div>
  );
}
