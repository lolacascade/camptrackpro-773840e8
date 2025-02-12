import { BaseDrawer } from "@/components/common/drawer";
import { Button } from "@/components/ui/button";
import { Booking } from "@/types/booking";
import { useCustomers } from "@/components/bookings/form/useCustomers";
import { CustomerSelect } from "./form/CustomerSelect";
import { AssetSelect } from "./form/AssetSelect";
import { SlotSelect } from "./form/SlotSelect";
import { useState } from "react";
import { Customer } from "@/types/customer";
import { DateRange } from "react-day-picker";
import { useForm } from "react-hook-form";

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

  const form = useForm({
    defaultValues: booking ? {
      customer_id: booking.customer_id,
      asset_id: booking.asset_id,
      site_id: booking.site_id,
      special_requirements: booking.special_requirements,
      status: booking.status,
      total_amount: booking.total_amount
    } : {
      customer_id: '',
      asset_id: '',
      site_id: '',
      special_requirements: '',
      status: 'pending',
      total_amount: 0
    }
  });

  const onSubmit = async (data: any) => {
    try {
      if (booking) {
        // Update existing booking
        const { error } = await supabase
          .from('bookings')
          .update({
            ...data,
            updated_at: new Date().toISOString()
          })
          .eq('id', booking.id);

        if (error) throw error;
      } else {
        // Create new booking
        const { error } = await supabase
          .from('bookings')
          .insert([{
            ...data,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      onBookingUpdated();
      onClose();
    } catch (error) {
      console.error('Error saving booking:', error);
      toast({
        title: "Error",
        description: "Failed to save booking. Please try again.",
        variant: "destructive"
      });
    }
  };

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

        <Button type="button" onClick={form.handleSubmit(onSubmit)} className="w-full">
          {booking ? "Update Booking" : "Create Booking"}
        </Button>
      </div>
    </BaseDrawer>
  );
}
