import { useState } from "react";
import { Card } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useBookingsList } from "@/hooks/bookings/use-bookings-list";
import type { Column } from "@/components/common/DataTable/DataTable";
import type { Booking } from "@/hooks/bookings/use-bookings-list";

export function BookingsList() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [customerFilter, setCustomerFilter] = useState("all");
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useBookingsList("");

  const columns: Column<Booking>[] = [
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (booking) => (
        <div>
          <div className="font-medium text-[#133134]">
            {booking.customer?.name || 'Unknown Customer'}
          </div>
          <div className="text-sm text-[#3E4238]">
            {booking.customer?.email || 'No email'}
          </div>
        </div>
      ),
    },
    {
      header: "Slot",
      accessorKey: "slot",
      cell: (booking) => booking.slot?.name ?? 'Unassigned',
    },
    {
      header: "Assets",
      accessorKey: "assets",
      cell: (booking) => (
        <>
          {booking.assets?.map((asset, index) => (
            <div key={index}>
              <span className="font-medium">{asset.asset_name}</span>
              <Badge variant="secondary" className="ml-2">
                {asset.asset_type}
              </Badge>
            </div>
          ))}
        </>
      ),
    },
    {
      header: "Check-in",
      accessorKey: "check_in_date",
      cell: (booking) => new Date(booking.check_in_date).toLocaleDateString(),
    },
    {
      header: "Check-out",
      accessorKey: "check_out_date",
      cell: (booking) => new Date(booking.check_out_date).toLocaleDateString(),
    },
    {
      header: "Requirements",
      accessorKey: "special_requirements",
      cell: (booking) => booking.special_requirements || 'None',
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

  const filters = [
    {
      name: "status",
      options: [
        { label: "All Statuses", value: "all" },
        { label: "Active", value: "active" },
        { label: "Completed", value: "completed" },
        { label: "Upcoming", value: "upcoming" }
      ],
      value: statusFilter,
      onChange: setStatusFilter
    },
    {
      name: "customer",
      options: [
        { label: "All Customers", value: "all" },
        ...(bookings?.filter(booking => booking.customer)
          .map(booking => ({
            label: booking.customer.name,
            value: booking.customer.id.toString()
          })) || [])
      ],
      value: customerFilter,
      onChange: setCustomerFilter
    }
  ];

  const filteredBookings = bookings?.filter(booking => {
    if (statusFilter !== "all") {
      const today = new Date();
      const checkOutDate = new Date(booking.check_out_date);
      const checkInDate = new Date(booking.check_in_date);
      
      if (statusFilter === "active" && (checkOutDate < today || checkInDate > today)) return false;
      if (statusFilter === "completed" && checkOutDate >= today) return false;
      if (statusFilter === "upcoming" && checkInDate <= today) return false;
    }

    if (customerFilter !== "all" && booking.customer?.id.toString() !== customerFilter) {
      return false;
    }

    return true;
  });

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <div className="p-4">
        <DataTable
          data={filteredBookings || []}
          columns={columns}
          onViewDetails={handleViewDetails}
          isLoading={isLoading}
          filters={filters}
        />
      </div>
    </Card>
  );
}