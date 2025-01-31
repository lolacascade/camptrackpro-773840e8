import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Customer } from "@/types/customer";
import { useCustomerForm } from "./form/useCustomerForm";
import { CustomerBasicInfo } from "./form/CustomerBasicInfo";
import { CustomerAddress } from "./form/CustomerAddress";

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
  console.log('CustomerDrawer received customer:', customer); // Debug log
  
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  } = useCustomerForm({
    customer,
    onCustomerUpdated,
    onClose
  });

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{customer ? 'Edit' : 'Add'} Customer</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <CustomerBasicInfo 
            register={register} 
            errors={errors} 
            defaultValues={customer}
          />
          <CustomerAddress 
            register={register} 
            defaultValues={customer}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#133134] text-white hover:bg-[#133134]/90"
          >
            {isSubmitting ? "Saving..." : `${customer ? 'Save Changes' : 'Add Customer'}`}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}