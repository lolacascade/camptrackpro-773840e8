import { useState } from "react";
import { Card } from "@/components/ui/card";
import { BookingsListFilters } from "./BookingsListFilters";
import { DataTable } from "@/components/common/DataTable/DataTable";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useBookingsList } from "@/hooks/bookings/use-bookings-list";
import type { Column } from "@/components/common/DataTable/DataTable";

export function BookingsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { data: bookings, isLoading } = useBookingsList(searchTerm);

  const columns: Column<any>[] = [
    {
      header: "Customer",
      accessorKey: "customer",
      cell: (booking) => (
        <div>
          <div className="font-medium text-[#133134]">{booking.customer.name}</div>
          <div className="text-sm text-[#3E4238]">
            {booking.customer.email}
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
          {booking.assets?.map((asset: any, index: number) => (
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

  const handleViewDetails = (booking: any) => {
    navigate(`/app/bookings/${booking.id}`);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <BookingsListFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className="p-4">
        <DataTable
          data={bookings || []}
          columns={columns}
          onViewDetails={handleViewDetails}
          isLoading={isLoading}
        />
      </div>
    </Card>
  );
}