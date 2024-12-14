import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { EntityField } from "./EntityField"
import { useEntityForm } from "./useEntityForm"
import type { EntityDrawerProps } from "./types"

export function EntityDrawer({
  entity,
  open,
  onClose,
  onEntityUpdated,
  title,
  fields,
  tableName
}: EntityDrawerProps) {
  const {
    formData,
    setFormData,
    isDeleting,
    isSaving,
    handleSave,
    handleDelete
  } = useEntityForm(entity, fields, tableName, onEntityUpdated, onClose)

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{entity ? `Edit ${title}` : `Add ${title}`}</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {fields.map((field) => (
            <EntityField
              key={field.name}
              field={{
                ...field,
                value: formData[field.name],
                onChange: (value) => setFormData(prev => ({ ...prev, [field.name]: value }))
              }}
            />
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