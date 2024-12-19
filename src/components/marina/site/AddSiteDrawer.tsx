import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from '@supabase/auth-helpers-react'
import { useState } from "react"
import { BasicInfoFields } from "./form/BasicInfoFields"
import { UtilitiesFields } from "./form/UtilitiesFields"
import { FeaturesFields } from "./form/FeaturesFields"
import { SiteFormData, SiteType } from "./types"
import { BaseDrawer } from "@/components/common/BaseDrawer"

interface AddSiteDrawerProps {
  open: boolean
  onClose: () => void
  onSiteAdded: () => void
}

const defaultFormData: SiteFormData = {
  name: '',
  site_type: null,
  length_ft: 0,
  width_ft: 0,
  hookup_type: null,
  electricity_voltage: null,
  surface_type: null,
  distance_to_facilities: {},
  status: 'available',
  special_features: {
    petFriendly: false,
    shade: false,
    firePit: false,
    picnicTable: false,
    wifi: false
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

    // Only validate the name field as it's the only required field
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Please provide a site name.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const dataToSave = {
        ...formData,
        user_id: session.user.id,
        status: 'available',
        distance_to_facilities: JSON.stringify(formData.distance_to_facilities),
        special_features: JSON.stringify(formData.special_features)
      }

      const { error } = await supabase
        .from('slots')
        .insert([dataToSave])

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

  const handleSiteTypeChange = (value: string) => {
    const siteType: SiteType = value === 'none' ? null : value as SiteType;
    setFormData(prev => ({ ...prev, site_type: siteType }));
  };

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title="Add New Site"
    >
      <div className="space-y-6 py-4">
        <BasicInfoFields
          name={formData.name}
          onNameChange={(name) => setFormData(prev => ({ ...prev, name }))}
        />

        <UtilitiesFields
          hookupType={formData.hookup_type}
          powerOption={formData.electricity_voltage}
          surfaceType={formData.surface_type}
          siteType={formData.site_type}
          onHookupTypeChange={(hookup_type) => setFormData(prev => ({ ...prev, hookup_type }))}
          onPowerOptionChange={(electricity_voltage) => setFormData(prev => ({ ...prev, electricity_voltage }))}
          onSurfaceTypeChange={(surface_type) => setFormData(prev => ({ ...prev, surface_type }))}
          onSiteTypeChange={handleSiteTypeChange}
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
    </BaseDrawer>
  )
}