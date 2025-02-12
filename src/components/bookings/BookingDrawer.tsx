
import { BaseDrawer } from "@/components/common/drawer";
import { Booking } from "@/types/booking";
import { useCustomers } from "../form/useCustomers";
import { useBookingForm } from "./useBookingForm";
import { BookingForm } from "./BookingForm";
import { useState } from "react";
import { Customer } from "@/types/customer";
import { DateRange } from "react-day-picker";

interface BookingDrawerProps {
  booking?: Booking;
  open: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

export function BookingDrawer({ booking, open, onClose, onBookingUpdated }: BookingDrawerProps) {
  const { customers } = useCustomers();
  const [newlyCreatedCustomer, setNewlyCreatedCustomer] = useState<Customer | null>(null);
  const [newlyCreatedAssetId, setNewlyCreatedAssetId] = useState<string | null>(null);
  const [newlyCreatedSiteId, setNewlyCreatedSiteId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date()
  });

  const {
    form,
    onSubmit
  } = useBookingForm({ 
    booking, 
    onClose, 
    onBookingUpdated,
    newlyCreatedCustomer,
    newlyCreatedAssetId,
    newlyCreatedSiteId
  });

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={booking ? "Edit Booking" : "New Booking"}
    >
      <div className="space-y-6">
        <CustomerSelect
          value={form.watch('customer_id') || ''}
          onSelect={(value) => form.setValue('customer_id', value)}
          customers={customers}
          onCustomerCreated={(customer) => {
            setNewlyCreatedCustomer(customer);
            form.setValue('customer_id', String(customer.id));
          }}
        />

        <AssetSelect
          value={form.watch('asset_id') || ''}
          onSelect={(value) => form.setValue('asset_id', value)}
          onAssetCreated={(assetId) => {
            setNewlyCreatedAssetId(assetId);
            form.setValue('asset_id', assetId);
          }}
        />

        <SlotSelect
          value={form.watch('site_id') || ''}
          onSelect={(value) => form.setValue('site_id', value)}
          dateRange={dateRange}
          onSiteCreated={(siteId) => {
            setNewlyCreatedSiteId(siteId);
            form.setValue('site_id', siteId);
          }}
        />

        <Button type="button" onClick={onSubmit} className="w-full">
          {booking ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </BaseDrawer>
  );
}
