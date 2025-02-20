
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { RVFormFields } from "./form/RVFormFields"
import { useRVForm } from "./hooks/useRVForm"
import { RV } from "@/types/rv"

interface RVDrawerProps {
  open: boolean
  onClose: () => void
  onRVAdded: () => void
  rv?: RV
}

export function RVDrawer({ open, onClose, onRVAdded, rv }: RVDrawerProps) {
  const { newRV, setNewRV, availableSlots, handleSubmit } = useRVForm({ 
    onClose, 
    onRVAdded,
    rv
  })

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{rv ? 'Edit RV' : 'Add New RV'}</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <RVFormFields
            newRV={newRV}
            setNewRV={setNewRV}
            availableSlots={availableSlots}
          />
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#133134] text-white hover:bg-[#133134]/90"
          >
            {rv ? 'Save Changes' : 'Add RV'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
