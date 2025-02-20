
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CustomerSelect } from "../form/CustomerSelect";
import { BookingDateRange } from "../form/BookingDateRange";
import { RVSelect } from "../form/RVSelect";
import { SlotSelect } from "../form/SlotSelect";
import { DateRange } from "react-day-picker";
import { Customer } from "@/types/customer";
import { UseFormReturn } from "react-hook-form";
import { SelectField } from "@/components/common/FormFields/SelectField";
import { statusOptions } from "../table/BookingStatusOptions";
import { BookingStatus } from "@/types/booking";

interface BookingFormProps {
  form: UseFormReturn<any>;
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
    <form onSubmit={onSubmit} className="space-y-6">
      <CustomerSelect
        value={form.watch('customer_id') || ''}
        onSelect={(value) => form.setValue('customer_id', value)}
        customers={customers}
        onCustomerCreated={onCustomerCreated}
      />

      <BookingDateRange
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />

      <RVSelect
        value={form.watch('rv_id') || ''}
        onSelect={(value) => form.setValue('rv_id', value)}
        onRVCreated={onRVCreated}
      />

      <SlotSelect
        value={form.watch('site_id') || ''}
        onSelect={(value) => form.setValue('site_id', value)}
        dateRange={dateRange}
        onSiteCreated={onSiteCreated}
      />

      <div className="space-y-2">
        <Label>Status</Label>
        <SelectField
          value={form.watch('status') || 'pending'}
          onChange={(value) => form.setValue('status', value as BookingStatus)}
          options={statusOptions.filter(opt => opt.value !== 'all')}
          placeholder="Select status"
        />
      </div>

      <div className="space-y-2">
        <Label>Total Amount</Label>
        <Input
          type="number"
          step="0.01"
          value={form.watch('total_amount') || ''}
          onChange={(e) => form.setValue('total_amount', parseFloat(e.target.value))}
          placeholder="Enter total amount"
          className="bg-white"
        />
      </div>

      <div className="space-y-2">
        <Label>Special Requirements</Label>
        <Input
          value={form.watch('special_requirements') || ''}
          onChange={(e) => form.setValue('special_requirements', e.target.value)}
          placeholder="Enter any special requirements"
          className="bg-white"
        />
      </div>

      <Button type="submit" className="w-full">
        {isEdit ? "Update Booking" : "Create Booking"}
      </Button>
    </form>
  );
}
