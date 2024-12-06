import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Customer } from "@/types/customer"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { supabase } from "@/integrations/supabase/client"

interface CustomerDrawerProps {
  customer: Customer | null
  open: boolean
  onClose: () => void
  onCustomerUpdated: () => void
}

export function CustomerDrawer({ customer, open, onClose, onCustomerUpdated }: CustomerDrawerProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState<Partial<Customer>>({})
  const [isDeleting, setIsDeleting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Update form data when customer changes or drawer opens
  useEffect(() => {
    if (open) {
      setFormData(customer || {
        name: '',
        email: '',
        phone: '',
        address: '',
      })
    }
  }, [customer, open])

  const handleSave = async () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Name is required.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      if (customer) {
        // Update existing customer
        const { error } = await supabase
          .from('customers')
          .update({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            updated_at: new Date().toISOString(),
          })
          .eq('id', customer.id)

        if (error) throw error
      } else {
        // Create new customer
        const { error } = await supabase
          .from('customers')
          .insert([{
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          }])

        if (error) throw error
      }

      toast({
        title: "Success",
        description: `Customer ${customer ? 'updated' : 'added'} successfully.`,
      })
      onCustomerUpdated()
      onClose()
    } catch (error) {
      console.error('Error saving customer:', error)
      toast({
        title: "Error",
        description: `Failed to ${customer ? 'update' : 'add'} customer.`,
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!customer) return
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customer.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Customer deleted successfully.",
      })
      onCustomerUpdated()
      onClose()
    } catch (error) {
      console.error('Error deleting customer:', error)
      toast({
        title: "Error",
        description: "Failed to delete customer.",
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
          <SheetTitle>{customer ? 'Edit' : 'Add'} Customer</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={formData.address || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-6">
          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving ? "Saving..." : `${customer ? 'Save Changes' : 'Add Customer'}`}
          </Button>
          {customer && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Customer"}
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}