import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Customer } from "@/types/customer"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { supabase } from "@/integrations/supabase/client"
import { useSession } from '@supabase/auth-helpers-react'
import { useForm } from "react-hook-form"
import InputMask from "react-input-mask"

interface CustomerDrawerProps {
  customer: Customer | null
  open: boolean
  onClose: () => void
  onCustomerUpdated: () => void
}

interface CustomerFormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  postal_code: string
  emergency_contact_name: string
  emergency_contact_phone: string
  emergency_contact_relationship: string
}

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

export function CustomerDrawer({ customer, open, onClose, onCustomerUpdated }: CustomerDrawerProps) {
  const { toast } = useToast()
  const session = useSession()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue
  } = useForm<CustomerFormData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
      emergency_contact_name: '',
      emergency_contact_phone: '',
      emergency_contact_relationship: ''
    }
  })

  useEffect(() => {
    if (open && customer) {
      reset(customer)
    } else if (open) {
      reset()
    }
  }, [customer, open, reset])

  const onSubmit = async (formData: CustomerFormData) => {
    if (!session?.user?.id) {
      toast({
        title: "Error",
        description: "You must be logged in to perform this action.",
        variant: "destructive",
      })
      return
    }

    try {
      if (customer) {
        const { error } = await supabase
          .from('customers')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          })
          .eq('id', customer.id)
          .eq('user_id', session.user.id)

        if (error) throw error
      } else {
        const { error } = await supabase
          .from('customers')
          .insert([{
            ...formData,
            user_id: session.user.id
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
    }
  }

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{customer ? 'Edit' : 'Add'} Customer</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name", { required: "Name is required" })}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: EMAIL_REGEX,
                  message: "Please enter a valid email"
                }
              })}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <InputMask
              mask="+1 (999) 999-9999"
              {...register("phone")}
            >
              {(inputProps: any) => (
                <Input
                  id="phone"
                  {...inputProps}
                  className={errors.phone ? "border-red-500" : ""}
                />
              )}
            </InputMask>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address")}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register("city")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input
                id="state"
                {...register("state")}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                {...register("country")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postal_code">Postal/Zip Code</Label>
              <Input
                id="postal_code"
                {...register("postal_code")}
              />
            </div>
          </div>

          <div className="border-t pt-4 mt-6">
            <h3 className="font-medium mb-4">Emergency Contact</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emergency_contact_name">Contact Name</Label>
                <Input
                  id="emergency_contact_name"
                  {...register("emergency_contact_name")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact_phone">Contact Phone</Label>
                <InputMask
                  mask="+1 (999) 999-9999"
                  {...register("emergency_contact_phone")}
                >
                  {(inputProps: any) => (
                    <Input
                      id="emergency_contact_phone"
                      {...inputProps}
                    />
                  )}
                </InputMask>
              </div>

              <div className="space-y-2">
                <Label htmlFor="emergency_contact_relationship">Relationship</Label>
                <Input
                  id="emergency_contact_relationship"
                  {...register("emergency_contact_relationship")}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-6">
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[#0D1D1F] text-white hover:bg-[#0D1D1F]/90"
            >
              {isSubmitting ? "Saving..." : `${customer ? 'Save Changes' : 'Add Customer'}`}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}