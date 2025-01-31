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
    <Sheet 
      open={open} 
      onOpenChange={onClose}
      modal={true} // Ensure modal behavior
    >
      <SheetContent 
        className={cn(
          "w-full sm:max-w-[720px] overflow-y-auto",
          "focus-visible:outline-none", // Remove focus outline that might cause z-index issues
          className
        )}
        onInteractOutside={(e) => {
          e.preventDefault() // Prevent any lingering events
          onClose()
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault() // Prevent any lingering events
          onClose()
        }}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  )
}