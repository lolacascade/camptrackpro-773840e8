import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from '@supabase/auth-helpers-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Field {
  name: string
  label: string
  type: 'text' | 'number' | 'select' | 'date'
  required?: boolean
  options?: { value: string; label: string }[]
}

interface EntityDrawerProps {
  entity: any
  open: boolean
  onClose: () => void
  onEntityUpdated: () => void
  title: string
  fields: Field[]
  tableName: string
}

export function EntityDrawer({
  entity,
  open,
  onClose,
  onEntityUpdated,
  title,
  fields,
  tableName
}: EntityDrawerProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<any>({})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const session = useSession()

  useEffect(() => {
    if (open) {
      setFormData(entity || {})
    }
  }, [entity, open])

  const handleSave = async () => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      })
      return
    }

    // Validate required fields
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
        user_id: session.user.id,
        updated_at: new Date().toISOString(),
      }

      if (entity) {
        const { error } = await supabase
          .from(tableName)
          .update(dataToSave)
          .eq('id', entity.id)
          .eq('user_id', session.user.id)

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
        description: `${title} ${entity ? 'updated' : 'added'} successfully.`,
      })
      onEntityUpdated()
      onClose()
    } catch (error) {
      console.error('Error saving:', error)
      toast({
        title: "Error",
        description: `Failed to ${entity ? 'update' : 'add'} ${title.toLowerCase()}.`,
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
        description: `${title} deleted successfully.`,
      })
      onEntityUpdated()
      onClose()
    } catch (error) {
      console.error('Error deleting:', error)
      toast({
        title: "Error",
        description: `Failed to delete ${title.toLowerCase()}.`,
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const renderField = (field: Field) => {
    switch (field.type) {
      case 'select':
        return (
          <Select
            value={formData[field.name] || ''}
            onValueChange={(value) => setFormData(prev => ({ ...prev, [field.name]: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      case 'number':
        return (
          <Input
            type="number"
            value={formData[field.name] || ''}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              [field.name]: e.target.value ? Number(e.target.value) : null 
            }))}
          />
        )
      case 'date':
        return (
          <Input
            type="date"
            value={formData[field.name] || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
          />
        )
      default:
        return (
          <Input
            value={formData[field.name] || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
          />
        )
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{entity ? `Edit ${title}` : `Add ${title}`}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <div key={field.name} className="grid gap-2">
              <Label htmlFor={field.name}>
                {field.label} {field.required && '*'}
              </Label>
              {renderField(field)}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : `${entity ? 'Save Changes' : 'Add ' + title}`}
          </Button>
          {entity && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : `Delete ${title}`}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}