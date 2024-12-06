import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Boat } from "@/types/boat"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface BoatDrawerProps {
  boat: Boat | null
  open: boolean
  onClose: () => void
  onBoatUpdated: () => void
}

export function BoatDrawer({ boat, open, onClose, onBoatUpdated }: BoatDrawerProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<Boat>>(boat || {})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    if (!boat) return
    setIsSaving(true)
    try {
      const { error } = await supabase
        .from('boats')
        .update({
          boat_name: formData.boat_name,
          boat_size: formData.boat_size,
          customer_id: formData.customer_id,
          slip_id: formData.slip_id,
          updated_at: new Date().toISOString(),
        })
        .eq('id', boat.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Boat updated successfully.",
      })
      onBoatUpdated()
      onClose()
    } catch (error) {
      console.error('Error updating boat:', error)
      toast({
        title: "Error",
        description: "Failed to update boat.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!boat) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('boats')
        .delete()
        .eq('id', boat.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Boat deleted successfully.",
      })
      onBoatUpdated()
      onClose()
    } catch (error) {
      console.error('Error deleting boat:', error)
      toast({
        title: "Error",
        description: "Failed to delete boat.",
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
          <SheetTitle>Edit Boat</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="boat_name">Boat Name</Label>
            <Input
              id="boat_name"
              value={formData.boat_name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, boat_name: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="boat_size">Size</Label>
            <Input
              id="boat_size"
              value={formData.boat_size || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, boat_size: e.target.value }))}
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
            <Label htmlFor="slip_id">Slip ID</Label>
            <Input
              id="slip_id"
              type="number"
              value={formData.slip_id || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, slip_id: parseInt(e.target.value) || null }))}
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
            {isDeleting ? "Deleting..." : "Delete Boat"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}