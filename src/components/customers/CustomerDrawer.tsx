import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Customer } from "@/types/customer";
import { CustomerBasicInfo } from "./form/CustomerBasicInfo";
import { CustomerAddress } from "./form/CustomerAddress";
import { useCustomerForm } from "./form/useCustomerForm";

interface CustomerDrawerProps {
  customer: Customer | null;
  open: boolean;
  onClose: () => void;
  onCustomerUpdated: () => void;
}

export function CustomerDrawer({ 
  customer, 
  open, 
  onClose, 
  onCustomerUpdated 
}: CustomerDrawerProps) {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  } = useCustomerForm(customer, onCustomerUpdated, onClose);

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{customer ? 'Edit' : 'Add'} Customer</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <CustomerBasicInfo register={register} errors={errors} />
          
          <div className="border-t pt-4">
            <h3 className="font-medium mb-4">Address Information</h3>
            <CustomerAddress register={register} />
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
  );
}