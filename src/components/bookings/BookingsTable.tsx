import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Booking } from "@/types/booking";
import { useQuery } from "@tanstack/react-query";
import { getBookingColumns } from "./table/BookingTableColumns";
import { statusOptions } from "./table/BookingStatusOptions";
import { supabase } from "@/integrations/supabase/client";
import { Slot } from "@/types/slot";
import { toast } from "sonner";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const [selectedStatus, setSelectedStatus] = useState("all");

  // Add example booking on component mount
  useEffect(() => {
    const addExampleBooking = async () => {
      const { data: existingBookings } = await supabase
        .from('bookings')
        .select('*')
        .limit(1);

      if (!existingBookings?.length) {
        const { data: customer } = await supabase
          .from('customers')
          .select('*')
          .limit(1)
          .single();

        const { data: asset } = await supabase
          .from('assets')
          .select('*')
          .limit(1)
          .single();

        if (customer && asset) {
          const { error } = await supabase
            .from('bookings')
            .insert([{
              customer_id: customer.id,
              asset_id: asset.id,
              check_in_date: new Date().toISOString(),
              check_out_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'pending',
              total_amount: 1000,
              special_requirements: 'Example booking'
            }]);

          if (error) {
            console.error('Error adding example booking:', error);
          }
        }
      }
    };

    addExampleBooking();
  }, []);

  const { data: bookings = [], isLoading, error } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      console.log('Fetching bookings...');
      
      // First get the user's organization and account context
      const { data: orgRoles, error: orgError } = await supabase
        .from('organization_roles')
        .select('organization_id')
        .single();

      if (orgError) {
        console.error('Error fetching organization:', orgError);
        toast.error("Failed to fetch organization context");
        throw orgError;
      }

      const { data: accRoles, error: accError } = await supabase
        .from('account_roles')
        .select('account_id')
        .single();

      if (accError) {
        console.error('Error fetching account:', accError);
        toast.error("Failed to fetch account context");
        throw accError;
      }

      // Then fetch bookings with organization and account filters
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          slot:slots(
            id, name, status, location_identifier, length_ft, width_ft, 
            is_covered, has_water, electricity_voltage, utility_connection_type,
            location_coordinates, customer_id, maintenance_id, created_at, updated_at,
            last_activity_at, user_id
          ),
          customer:customers(*),
          asset:assets(*)
        `)
        .eq('organization_id', orgRoles.organization_id)
        .eq('account_id', accRoles.account_id);
      
      if (error) {
        console.error('Error fetching bookings:', error);
        toast.error("Failed to fetch bookings");
        throw error;
      }

      console.log('Bookings data received:', data);
      
      const mappedData = (data || []).map((booking): Booking => ({
        id: booking.id,
        customer_id: booking.customer_id,
        asset_id: booking.asset_id,
        check_in_date: booking.check_in_date,
        check_out_date: booking.check_out_date,
        status: booking.status,
        total_amount: booking.total_amount,
        created_at: booking.created_at,
        updated_at: booking.updated_at,
        slot_id: booking.slot_id,
        special_requirements: booking.special_requirements,
        reservation_code: booking.reservation_code,
        user_id: booking.user_id,
        customer: booking.customer,
        asset: booking.asset,
        slot: booking.slot ? {
          ...booking.slot,
          id: Number(booking.slot.id),
          status: booking.slot.status as Slot['status'],
          length_ft: booking.slot.length_ft ? Number(booking.slot.length_ft) : null,
          width_ft: booking.slot.width_ft ? Number(booking.slot.width_ft) : null,
          maintenance_id: booking.slot.maintenance_id ? Number(booking.slot.maintenance_id) : null,
          user_id: booking.slot.user_id || null
        } as Slot : undefined
      }));

      console.log('Mapped bookings data:', mappedData);
      return mappedData;
    }
  });

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  // Handle query error
  if (error) {
    toast.error("Failed to load bookings. Please try again.");
  }

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={bookings}
          columns={getBookingColumns()}
          isLoading={isLoading}
          filters={[
            {
              name: "status",
              options: statusOptions,
              value: selectedStatus,
              onChange: handleStatusChange,
            }
          ]}
          tableName="bookings"
          onRowClick={onEdit}
        />
      </div>
    </Card>
  );
}