import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { AssetFormFields } from "@/components/assets/form/AssetFormFields"
import { useAssetForm } from "@/components/assets/hooks/useAssetForm"
import { Asset } from "@/types/asset"

interface AssetDrawerProps {
  open: boolean
  onClose: () => void
  onAssetAdded: () => void
  customerId: string | null
  asset?: Asset
}

export function AssetDrawer({ open, onClose, onAssetAdded, customerId, asset }: AssetDrawerProps) {
  const { newAsset, setNewAsset, availableSlots, handleSubmit } = useAssetForm({ 
    onClose, 
    onAssetAdded,
    customerId,
    asset
  })

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{asset ? 'Edit RV' : 'Add New RV'}</SheetTitle>
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
            {asset ? 'Save Changes' : 'Add RV'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
