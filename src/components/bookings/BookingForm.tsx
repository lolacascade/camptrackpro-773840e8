
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomerSelect } from "./form/CustomerSelect";
import { RVSelect } from "./form/RVSelect";
import { SiteSelect } from "./form/SiteSelect";
import { BookingDateRange } from "./form/BookingDateRange";
import { Customer } from "@/types";
import { useForm } from "react-hook-form";
import { BookingFormData } from "@/types";

interface BookingFormProps {
  form: ReturnType<typeof useForm<BookingFormData>>;
  onSubmit: () => void;
  customers: Customer[];
  isEdit?: boolean;
  onCustomerCreated: (customer: Customer) => void;
  onRVCreated: (rvId: string) => void;
  onSiteCreated: (siteId: string) => void;
}

export function BookingForm({
  form,
  onSubmit,
  customers,
  isEdit,
  onCustomerCreated,
  onRVCreated,
  onSiteCreated
}: BookingFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6">
        <CustomerSelect
          value={form.watch('customer_id')}
          onSelect={(value) => form.setValue('customer_id', value)}
          customers={customers}
          onCustomerCreated={onCustomerCreated}
        />

        <RVSelect
          value={form.watch('rv_id')}
          onSelect={(value) => form.setValue('rv_id', value)}
          onRVCreated={onRVCreated}
        />

        <SiteSelect
          value={form.watch('site_id')}
          onSelect={(value) => form.setValue('site_id', value)}
          onSiteCreated={onSiteCreated}
        />

        <BookingDateRange
          checkIn={form.watch('check_in')}
          checkOut={form.watch('check_out')}
          onCheckInChange={(value) => form.setValue('check_in', value)}
          onCheckOutChange={(value) => form.setValue('check_out', value)}
        />

        <Button 
          type="submit"
          className="w-full bg-[#133134] text-white hover:bg-[#133134]/90"
        >
          {isEdit ? 'Update Booking' : 'Create Booking'}
        </Button>
      </form>
    </Form>
  );
}
