
import { BaseDrawer } from "@/components/common/drawer";
import { Booking } from "@/types/booking";
import { useCustomers } from "../form/useCustomers";
import { useBookingForm } from "./useBookingForm";
import { BookingForm } from "./BookingForm";
import { useState } from "react";
import { Customer } from "@/types/customer";

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

  const {
    form,
    dateRange,
    setDateRange,
    onSubmit
  } = useBookingForm({ 
    booking, 
    onClose, 
    onBookingUpdated,
    newlyCreatedCustomer,
    newlyCreatedAssetId,
    newlyCreatedSiteId
  });

  const handleCustomerCreated = (customer: Customer) => {
    setNewlyCreatedCustomer(customer);
    form.setValue('customer_id', String(customer.id));
  };

  const handleAssetCreated = (assetId: string) => {
    setNewlyCreatedAssetId(assetId);
    form.setValue('asset_id', assetId);
  };

  const handleSiteCreated = (siteId: string) => {
    setNewlyCreatedSiteId(siteId);
    form.setValue('site_id', siteId);
  };

  return (
    <BaseDrawer
      open={open}
      onClose={onClose}
      title={booking ? "Edit Booking" : "New Booking"}
    >
      <BookingForm
        form={form}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        customers={customers}
        onSubmit={onSubmit}
        isEdit={!!booking}
        onCustomerCreated={handleCustomerCreated}
        onAssetCreated={handleAssetCreated}
        onSiteCreated={handleSiteCreated}
      />
    </BaseDrawer>
  );
}
