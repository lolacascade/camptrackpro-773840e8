import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Asset } from "@/types/asset"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface AssetDrawerProps {
  asset: Asset | null
  open: boolean
  onClose: () => void
  onAssetUpdated: () => void
}

export function AssetDrawer({ asset, open, onClose, onAssetUpdated }: AssetDrawerProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<Asset>>(asset || {})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (asset && open) {
      setFormData(asset)
    }
  }, [asset, open])

  const handleSave = async () => {
    if (!asset) return
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('assets')
        .update({
          asset_name: formData.asset_name,
          asset_size: formData.asset_size,
          customer_id: formData.customer_id,
          slot_id: formData.slot_id,
          asset_type: formData.asset_type,
          updated_at: new Date().toISOString(),
        })
        .eq('id', asset.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Asset updated successfully.",
      })
      onAssetUpdated()
      onClose()
    } catch (error) {
      console.error('Error updating asset:', error)
      toast({
        title: "Error",
        description: "Failed to update asset.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!asset) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('assets')
        .delete()
        .eq('id', asset.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Asset deleted successfully.",
      })
      onAssetUpdated()
      onClose()
    } catch (error) {
      console.error('Error deleting asset:', error)
      toast({
        title: "Error",
        description: "Failed to delete asset.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Asset</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="asset_name">Asset Name</Label>
            <Input
              id="asset_name"
              value={formData.asset_name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, asset_name: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset_size">Size</Label>
            <Input
              id="asset_size"
              value={formData.asset_size || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, asset_size: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="customer_id">Customer ID</Label>
            <Input
              id="customer_id"
              type="number"
              value={formData.customer_id || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, customer_id: parseInt(e.target.value) || null }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="slot_id">Slot ID</Label>
            <Input
              id="slot_id"
              type="number"
              value={formData.slot_id || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, slot_id: parseInt(e.target.value) || null }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="asset_type">Asset Type</Label>
            <Input
              id="asset_type"
              value={formData.asset_type || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, asset_type: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete Asset"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}