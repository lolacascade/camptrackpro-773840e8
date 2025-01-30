import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  calculatedAmount: number | null;
  manualAmount: string;
  onManualAmountChange: (value: string) => void;
  customers: Customer[];
  onSubmit: () => void;
  isEdit?: boolean;
}

export function BookingForm({
  form,
  dateRange,
  onDateRangeChange,
  calculatedAmount,
  manualAmount,
  onManualAmountChange,
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
        value={form.watch('site_id')?.toString() || ''}
        onSelect={(value) => form.setValue('site_id', parseInt(value))}
        dateRange={dateRange}
      />

      <div className="space-y-2">
        <Label>Pricing</Label>
        {calculatedAmount !== null && (
          <div className="text-sm text-muted-foreground mb-2">
            Calculated amount: ${calculatedAmount}
          </div>
        )}
        <Input
          type="number"
          step="0.01"
          value={manualAmount}
          onChange={(e) => onManualAmountChange(e.target.value)}
          placeholder="Enter total amount"
        />
      </div>

      <Button type="submit" className="w-full">
        {isEdit ? "Update Booking" : "Create Booking"}
      </Button>
    </form>
  );
}