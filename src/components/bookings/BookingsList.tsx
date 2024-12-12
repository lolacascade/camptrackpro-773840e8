import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { BookingsListFilters } from "./BookingsListFilters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Booking {
  id: number;
  customer: {
    name: string;
    email: string;
  };
  slot: {
    name: string;
  } | null;
  check_in_date: string;
  check_out_date: string;
  special_requirements: string | null;
  assets: {
    asset_name: string;
    asset_type: string;
  }[];
}

export function BookingsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  const { data: bookings, isLoading } = useQuery({
    queryKey: ['bookings-list', searchTerm],
    queryFn: async () => {
      const query = supabase
        .from('bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          special_requirements,
          customer:customers(name, email),
          slot:slots(name),
          assets:bookings_assets(
            asset:assets(
              asset_name,
              asset_type
            )
          )
        `);

      if (searchTerm) {
        query.or(`customer.name.ilike.%${searchTerm}%,customer.email.ilike.%${searchTerm}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load bookings.",
          variant: "destructive",
        });
        throw error;
      }

      // Transform the data to match our Booking interface
      const transformedData = data?.map(booking => ({
        ...booking,
        assets: booking.assets?.map(ba => ({
          asset_name: ba.asset.asset_name,
          asset_type: ba.asset.asset_type
        })) || []
      }));

      return transformedData as Booking[];
    },
  });

  const handleEdit = (bookingId: number) => {
    // Implement edit functionality
    console.log("Edit booking:", bookingId);
  };

  const handleViewDetails = (bookingId: number) => {
    // Implement view details functionality
    console.log("View booking details:", bookingId);
  };

  return (
    <Card className="border border-[#E8EBEB] rounded-xl bg-transparent">
      <BookingsListFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[#133134]">Customer</TableHead>
              <TableHead className="text-[#133134]">Slot</TableHead>
              <TableHead className="text-[#133134]">Assets</TableHead>
              <TableHead className="text-[#133134]">Check-in</TableHead>
              <TableHead className="text-[#133134]">Check-out</TableHead>
              <TableHead className="text-[#133134]">Requirements</TableHead>
              <TableHead className="text-[#133134]">Status</TableHead>
              <TableHead className="text-[#133134]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : bookings?.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <div className="font-medium text-[#133134]">{booking.customer.name}</div>
                    <div className="text-sm text-[#3E4238]">
                      {booking.customer.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-[#3E4238]">{booking.slot?.name ?? 'Unassigned'}</TableCell>
                <TableCell className="text-[#3E4238]">
                  {booking.assets?.map((asset, index) => (
                    <div key={index}>
                      <span className="font-medium">{asset.asset_name}</span>
                      <Badge variant="secondary" className="ml-2">
                        {asset.asset_type}
                      </Badge>
                    </div>
                  ))}
                </TableCell>
                <TableCell className="text-[#3E4238]">{new Date(booking.check_in_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-[#3E4238]">{new Date(booking.check_out_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-[#3E4238]">
                  {booking.special_requirements || 'None'}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-primary/10 text-primary">
                    {new Date(booking.check_out_date) > new Date() ? 'Active' : 'Completed'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(booking.id)}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewDetails(booking.id)}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}