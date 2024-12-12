import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { BookingsPriorityFilter } from "./bookings/BookingsPriorityFilter";
import { getBookingsColumns } from "./bookings/BookingsColumns";
import { Booking } from "./bookings/types";

export function BookingsToday() {
  const navigate = useNavigate();
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings-today'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          customer:customers(name, email),
          slot:slots(name)
        `)
        .eq('check_in_date', new Date().toISOString().split('T')[0]);

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }

      // Add mock priority and status for demonstration
      return data.map((booking: any) => ({
        ...booking,
        status: Math.random() > 0.5 ? 'checked_in' : 'pending',
        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low',
        customer: {
          ...booking.customer,
          isVIP: Math.random() > 0.8
        }
      })) as Booking[];
    },
  });

  const filteredBookings = bookings?.filter(booking => 
    priorityFilter === "all" || booking.priority === priorityFilter
  ) || [];

  const handleViewDetails = (booking: Booking) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Today's Check-ins</CardTitle>
        <BookingsPriorityFilter 
          value={priorityFilter} 
          onChange={setPriorityFilter} 
        />
      </CardHeader>
      <CardContent>
        <DataTable
          data={filteredBookings}
          columns={getBookingsColumns()}
          onViewDetails={handleViewDetails}
          itemsPerPage={5}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}