
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { CustomerSelect } from "../form/CustomerSelect";
import { BookingDateRange } from "../form/BookingDateRange";
import { AssetSelect } from "../form/AssetSelect";
import { SlotSelect } from "../form/SlotSelect";
import { DateRange } from "react-day-picker";
import { BookingFormData } from "../types";
import { Customer } from "@/types/customer";

interface BookingDrawerFormProps {
  booking?: any;
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onSubmit: (data: BookingFormData) => Promise<void>;
  customers: Customer[];
  isSubmitting: boolean;
  onCustomerCreated: (customer: Customer) => void;
  onAssetCreated: (assetId: string) => void;
  onSiteCreated: (siteId: string) => void;
}

export function BookingDrawerForm({
  booking,
  dateRange,
  onDateRangeChange,
  onSubmit,
  customers,
  isSubmitting,
  onCustomerCreated,
  onAssetCreated,
  onSiteCreated
}: BookingDrawerFormProps) {
  const { register, handleSubmit, setValue, watch } = useForm<BookingFormData>({
    defaultValues: booking ? {
      customer_id: booking.customer_id,
      asset_id: booking.asset_id,
      site_id: booking.site_id,
      special_requirements: booking.special_requirements
    } : {}
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <CustomerSelect
        value={watch('customer_id') || ''}
        onSelect={(value) => setValue('customer_id', value)}
        customers={customers}
        onCustomerCreated={onCustomerCreated}
      />

      <BookingDateRange
        dateRange={dateRange}
        onDateRangeChange={onDateRangeChange}
      />

      <AssetSelect
        value={watch('asset_id') || ''}
        onSelect={(value) => setValue('asset_id', value)}
        onAssetCreated={onAssetCreated}
      />

      <SlotSelect
        value={watch('site_id') || ''}
        onSelect={(value) => setValue('site_id', value)}
        dateRange={dateRange}
        onSiteCreated={onSiteCreated}
      />

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {booking ? "Update Booking" : "Create Booking"}
      </Button>
    </form>
  );
}
