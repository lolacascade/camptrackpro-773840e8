import { Button } from "@/components/ui/button";
import { CustomerSelect } from "../form/CustomerSelect";
import { BookingDateRange } from "../form/BookingDateRange";
import { AssetSelect } from "../form/AssetSelect";
import { SlotSelect } from "../form/SlotSelect";
import { DateRange } from "react-day-picker";
import { Customer } from "@/types/customer";
import { UseFormReturn } from "react-hook-form";

interface BookingFormProps {
  form: UseFormReturn<any>;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  customers: Customer[];
  onSubmit: () => void;
  isEdit?: boolean;
}

export function BookingForm({
  form,
  dateRange,
  onDateRangeChange,
  customers,
  onSubmit,
  isEdit
}: BookingFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <CustomerSelect
        value={form.watch('customer_id') || ''}
        onSelect={(value) => form.setValue('customer_id', value)}
        customers={customers}
      />

      <BookingDateRange
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />

      <AssetSelect
        value={form.watch('asset_id') || ''}
        onSelect={(value) => form.setValue('asset_id', value)}
      />

      <SlotSelect
        value={form.watch('site_id') || ''}
        onSelect={(value) => form.setValue('site_id', value.toString())}
        dateRange={dateRange}
      />

      <Button type="submit" className="w-full">
        {isEdit ? "Update Booking" : "Create Booking"}
      </Button>
    </form>
  );
}