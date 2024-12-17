import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from '@supabase/auth-helpers-react'
import { useState } from "react"
import { BasicInfoFields } from "./form/BasicInfoFields"
import { UtilitiesFields } from "./form/UtilitiesFields"
import { CapacityFields } from "./form/CapacityFields"
import { PricingFields } from "./form/PricingFields"
import { FeaturesFields } from "./form/FeaturesFields"
import { SiteFormData } from "./types"

interface AddSiteDrawerProps {
  open: boolean
  onClose: () => void
  onSiteAdded: () => void
}

const defaultFormData: SiteFormData = {
  name: '',
  site_type: 'back-in',
  length_ft: 0,
  width_ft: 0,
  hookup_type: 'full',
  electricity_voltage: '30A',
  surface_type: 'gravel',
  distance_to_facilities: {},
  max_capacity: { people: 4, vehicles: 2 },
  status: 'available',
  special_features: {
    petFriendly: false,
    shade: false,
    firePit: false,
    picnicTable: false,
    wifi: false
  },
  pricing: {
    nightly: 0,
    weekly: 0,
    monthly: 0
  },
  photos: [],
  notes: '',
  location_identifier: ''
}

export function AddSiteDrawer({ open, onClose, onSiteAdded }: AddSiteDrawerProps) {
  const { toast } = useToast()
  const session = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<SiteFormData>(defaultFormData)

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
          status: 'available'
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
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Site</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-4">
          <BasicInfoFields
            name={formData.name}
            siteType={formData.site_type}
            onNameChange={(name) => setFormData(prev => ({ ...prev, name }))}
            onSiteTypeChange={(site_type) => setFormData(prev => ({ ...prev, site_type }))}
          />

          <UtilitiesFields
            hookupType={formData.hookup_type}
            powerOption={formData.electricity_voltage}
            surfaceType={formData.surface_type}
            onHookupTypeChange={(hookup_type) => setFormData(prev => ({ ...prev, hookup_type }))}
            onPowerOptionChange={(electricity_voltage) => setFormData(prev => ({ ...prev, electricity_voltage }))}
            onSurfaceTypeChange={(surface_type) => setFormData(prev => ({ ...prev, surface_type }))}
          />

          <CapacityFields
            capacity={formData.max_capacity}
            onCapacityChange={(max_capacity) => setFormData(prev => ({ ...prev, max_capacity }))}
          />

          <PricingFields
            pricing={formData.pricing}
            onPricingChange={(pricing) => setFormData(prev => ({ ...prev, pricing }))}
          />

          <FeaturesFields
            features={formData.special_features}
            onFeaturesChange={(special_features) => setFormData(prev => ({ ...prev, special_features }))}
          />

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Special restrictions or recommendations (e.g., Best for RVs under 35ft)"
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