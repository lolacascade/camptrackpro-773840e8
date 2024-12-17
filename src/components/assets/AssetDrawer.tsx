import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AssetFormFields } from "./form/AssetFormFields"
import { useAssetForm } from "./hooks/useAssetForm"

interface AssetDrawerProps {
  open: boolean
  onClose: () => void
  onAssetAdded: () => void
}

export function AssetDrawer({ open, onClose, onAssetAdded }: AssetDrawerProps) {
  const { newAsset, setNewAsset, availableSlots, handleSubmit } = useAssetForm({ 
    onClose, 
    onAssetAdded 
  })

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New RV</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <AssetFormFields
            newAsset={newAsset}
            setNewAsset={setNewAsset}
            availableSlots={availableSlots}
          />
          <Button 
            onClick={handleSubmit}
            className="w-full bg-[#133134] text-white hover:bg-[#133134]/90"
          >
            Add RV
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}