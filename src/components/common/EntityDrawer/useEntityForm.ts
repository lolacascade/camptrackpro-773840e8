import { useState } from "react"
import { useSession } from '@supabase/auth-helpers-react'
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import type { Field, TableName } from "./types"
import { useQuery } from "@tanstack/react-query"

export function useEntityForm(
  entity: any,
  fields: Field[],
  tableName: TableName,
  onEntityUpdated: () => void,
  onClose: () => void
) {
  const { toast } = useToast()
  const [formData, setFormData] = useState(entity || {})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const session = useSession()

  const { data: userProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session?.user?.id)
        .single();
      return profile;
    },
    enabled: !!session?.user?.id
  });

  const handleSave = async () => {
    if (!session?.user?.id || !userProfile?.account_id) {
      toast({
        title: "Error",
        description: "You must be logged in and have an account to perform this action.",
        variant: "destructive",
      })
      return
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
      return
    }

    setIsSaving(true)
    try {
      const dataToSave = {
        ...formData,
        account_id: userProfile.account_id,
        user_id: session.user.id,
        updated_at: new Date().toISOString(),
      }

      if (entity) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToSave)
          .eq('id', entity.id)

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