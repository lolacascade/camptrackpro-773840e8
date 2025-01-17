import { DataTable } from "@/components/common/DataTable/DataTable";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from '@supabase/auth-helpers-react';
import { Booking } from "@/types/booking";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface BookingsTableProps {
  onEdit?: (booking: Booking) => void;
}

export function BookingsTable({ onEdit }: BookingsTableProps) {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const session = useSession();

  const fetchBookings = async () => {
    try {
      if (!session?.user?.id) return;
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          customer:customers(name, email),
          slot:slots(name)
        `)
        .order('check_in_date', { ascending: false });

      if (error) throw error;
      
      // Ensure the status is one of the allowed values
      const typedBookings = (data || []).map(booking => ({
        ...booking,
        status: booking.status as Booking['status']
      }));
      
      setBookings(typedBookings);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        title: "Error",
        description: "Failed to load bookings.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user) {
      fetchBookings();
    }
  }, [session]);

  const columns = [
    {
      header: "Customer",
      accessorKey: "customer.name",
    },
    {
      header: "Slot",
      accessorKey: "slot.name",
    },
    {
      header: "Check In",
      accessorKey: "check_in_date",
      cell: (item: any) => format(new Date(item.check_in_date), "MMM d, yyyy")
    },
    {
      header: "Check Out",
      accessorKey: "check_out_date",
      cell: (item: any) => format(new Date(item.check_out_date), "MMM d, yyyy")
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (item: any) => {
        const statusColors = {
          pending: "bg-yellow-100 text-yellow-800",
          confirmed: "bg-green-100 text-green-800",
          checked_in: "bg-blue-100 text-blue-800",
          completed: "bg-gray-100 text-gray-800",
          cancelled: "bg-red-100 text-red-800"
        };

        return (
          <Badge className={statusColors[item.status] || "bg-gray-100 text-gray-800"}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        );
      }
    },
    {
      header: "Reservation Code",
      accessorKey: "reservation_code",
    }
  ];

  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Confirmed", value: "confirmed" },
    { label: "Checked In", value: "checked_in" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" }
  ];

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={bookings}
          columns={columns}
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
          onRowClick={onEdit ? (row) => onEdit(row as Booking) : undefined}
        />
      </div>
    </Card>
  );
}