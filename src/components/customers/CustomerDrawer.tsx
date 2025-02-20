
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Customer } from "@/types/customer";
import { useCustomerForm } from "./form/useCustomerForm";
import { CustomerBasicInfo } from "./form/CustomerBasicInfo";

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
  } = useCustomerForm({
    customer,
    onCustomerUpdated,
    onClose
  });

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{customer ? 'Edit' : 'Add'} Customer</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <CustomerBasicInfo 
            register={register} 
            errors={errors} 
            defaultValues={customer}
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Saving..." : `${customer ? 'Save Changes' : 'Add Customer'}`}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
