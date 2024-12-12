import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable, Column } from "@/components/common/DataTable/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface Booking {
  id: number;
  customer: {
    name: string;
    email: string;
    isVIP?: boolean;
  };
  slot: {
    name: string;
  };
  check_in_date: string;
  check_out_date: string;
  status: 'pending' | 'checked_in' | 'overdue' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

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

  const columns: Column<Booking>[] = [
    {
      header: "Priority",
      accessorKey: "priority",
      cell: (booking) => (
        <Badge 
          variant={
            booking.priority === 'high' ? 'destructive' : 
            booking.priority === 'medium' ? 'default' : 
            'secondary'
          }
        >
          {booking.priority}
        </Badge>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (booking) => (
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              {booking.customer.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-[#133134]">{booking.customer.name}</p>
              {booking.customer.isVIP && (
                <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">
                  VIP
                </Badge>
              )}
            </div>
            <p className="text-sm text-[#3E4238]">{booking.customer.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Slot",
      accessorKey: "slot",
      cell: (booking) => (
        <span className="text-[#3E4238]">{booking.slot?.name ?? 'Unassigned'}</span>
      ),
    },
    {
      header: "Check-in",
      accessorKey: "check_in_date",
      cell: (booking) => (
        <span className="text-[#3E4238]">
          {new Date(booking.check_in_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Check-out",
      accessorKey: "check_out_date",
      cell: (booking) => (
        <span className="text-[#3E4238]">
          {new Date(booking.check_out_date).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "check_out_date",
      cell: (booking) => (
        <Badge variant="outline" className="bg-primary/10 text-primary">
          {new Date(booking.check_out_date) > new Date() ? 'Active' : 'Completed'}
        </Badge>
      ),
    },
  ];

  const handleViewDetails = (booking: Booking) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[#133134] text-2xl">Today's Check-ins</CardTitle>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <DataTable
          data={filteredBookings}
          columns={columns}
          onViewDetails={handleViewDetails}
          itemsPerPage={5}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
}