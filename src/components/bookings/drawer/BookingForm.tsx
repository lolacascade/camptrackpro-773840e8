
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BookingDateRange } from "../form/BookingDateRange";
import { DateRange } from "react-day-picker";
import { Customer } from "@/types/customer";
import { UseFormReturn } from "react-hook-form";
import { BookingFormData } from "@/types/booking";

interface BookingFormProps {
  form: UseFormReturn<BookingFormData>;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  customers: Customer[];
  onSubmit: () => void;
  isEdit?: boolean;
  onCustomerCreated: (customer: Customer) => void;
  onRVCreated: (rvId: string) => void;
  onSiteCreated: (siteId: string) => void;
}

export function BookingForm({ 
  form,
  dateRange, 
  onDateRangeChange,
  customers,
  onSubmit,
  isEdit,
  onCustomerCreated,
  onRVCreated,
  onSiteCreated
}: BookingFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <Label htmlFor="customer">Customer</Label>
          <Input id="customer" placeholder="Select customer" />
        </div>

        <BookingDateRange 
          dateRange={dateRange}
          onDateRangeChange={onDateRangeChange}
        />

        <Button 
          type="submit"
          className="w-full bg-primary hover:bg-primary/90"
        >
          {isEdit ? 'Update Booking' : 'Create Booking'}
        </Button>
      </form>
    </Form>
  );
}
