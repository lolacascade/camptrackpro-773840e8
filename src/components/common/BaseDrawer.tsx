import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface BaseDrawerProps {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  className?: string
}

export function BaseDrawer({ 
  open, 
  onClose, 
  title, 
  children,
  className 
}: BaseDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className={cn("overflow-y-auto", className)}>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}