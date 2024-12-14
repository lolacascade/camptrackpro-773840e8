import { useState, useEffect } from "react"
import { useSession } from '@supabase/auth-helpers-react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { Field, TableNames } from "./types"

export function useEntityForm(
  entity: any,
  fields: Field[],
  tableName: TableNames,
  onEntityUpdated: () => void,
  onClose: () => void
) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<any>({})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const session = useSession()

  useEffect(() => {
    setFormData(entity || {})
  }, [entity])

  const validateForm = () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      })
      return false
    }

    const missingFields = fields
      .filter(field => field.required && !formData[field.name])
      .map(field => field.label)

    if (missingFields.length > 0) {
      toast({
        title: "Error",
        description: `Required fields missing: ${missingFields.join(', ')}`,
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSave = async () => {
    if (!validateForm()) return

    setIsSaving(true)
    try {
      const dataToSave = {
        ...formData,
        user_id: session!.user.id,
        updated_at: new Date().toISOString(),
      }

      if (entity) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToSave)
          .eq('id', entity.id)
          .eq('user_id', session!.user.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from(tableName)
          .insert([{
            ...dataToSave,
            created_at: new Date().toISOString()
          }])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Item ${entity ? 'updated' : 'added'} successfully.`,
      })
      onEntityUpdated()
      onClose()
    } catch (error) {
      console.error('Error saving:', error)
      toast({
        title: "Error",
        description: `Failed to ${entity ? 'update' : 'add'} item.`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!entity || !session?.user?.id) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', entity.id)
        .eq('user_id', session.user.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Item deleted successfully.",
      })
      onEntityUpdated()
      onClose()
    } catch (error) {
      console.error('Error deleting:', error)
      toast({
        title: "Error",
        description: "Failed to delete item.",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    formData,
    setFormData,
    isDeleting,
    isSaving,
    handleSave,
    handleDelete
  }
}