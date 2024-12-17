import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from '@supabase/auth-helpers-react'
import { useState } from "react"

interface AddSiteDrawerProps {
  open: boolean
  onClose: () => void
  onSiteAdded: () => void
}

export function AddSiteDrawer({ open, onClose, onSiteAdded }: AddSiteDrawerProps) {
  const { toast } = useToast()
  const session = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    dock: '',
    length_ft: '',
    width_ft: '',
    is_covered: false,
    electricity_voltage: '',
    has_water: false,
    zone: '',
    location_identifier: ''
  })

  const handleSubmit = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      })
      return
    }

    if (!formData.name || !formData.location_identifier) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const { error } = await supabase
        .from('slots')
        .insert([{
          ...formData,
          user_id: session.user.id,
          status: 'available',
          length_ft: parseInt(formData.length_ft) || null,
          width_ft: parseInt(formData.width_ft) || null
        }])

      if (error) throw error

      toast({
        title: "Success",
        description: "Site added successfully.",
      })
      onSiteAdded()
      onClose()
    } catch (error) {
      console.error('Error adding site:', error)
      toast({
        title: "Error",
        description: "Failed to add site. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Site</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Site Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., A1, B2..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zone">Zone</Label>
            <Input
              id="zone"
              value={formData.zone}
              onChange={(e) => setFormData(prev => ({ ...prev, zone: e.target.value }))}
              placeholder="e.g., North, South..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length">Length (ft)</Label>
              <Input
                id="length"
                type="number"
                value={formData.length_ft}
                onChange={(e) => setFormData(prev => ({ ...prev, length_ft: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="width">Width (ft)</Label>
              <Input
                id="width"
                type="number"
                value={formData.width_ft}
                onChange={(e) => setFormData(prev => ({ ...prev, width_ft: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="electricity">Electricity</Label>
            <Select
              value={formData.electricity_voltage}
              onValueChange={(value) => setFormData(prev => ({ ...prev, electricity_voltage: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select voltage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30A">30A</SelectItem>
                <SelectItem value="50A">50A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="covered">Covered Site</Label>
            <Switch
              id="covered"
              checked={formData.is_covered}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_covered: checked }))}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="water">Water Access</Label>
            <Switch
              id="water"
              checked={formData.has_water}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_water: checked }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location Identifier *</Label>
            <Input
              id="location"
              value={formData.location_identifier}
              onChange={(e) => setFormData(prev => ({ ...prev, location_identifier: e.target.value }))}
              placeholder="e.g., Section 1, Row A..."
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="w-full bg-[#C0CCAB] text-[#0D1D1F] hover:bg-[#C0CCAB]/90"
          >
            {isSubmitting ? "Adding..." : "Add Site"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}