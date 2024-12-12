import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageWithChat } from "@/components/layout/PageWithChat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function BookingDetails() {
  const { id } = useParams();

  const { data: booking, isLoading } = useQuery({
    queryKey: ['booking-details', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          check_in_date,
          check_out_date,
          special_requirements,
          customer:customers(
            id,
            name,
            email,
            phone,
            address
          ),
          slot:slots(
            id,
            name,
            dock,
            length_ft,
            width_ft,
            electricity_voltage,
            has_water
          ),
          bookings_assets(
            asset:assets(
              id,
              asset_name,
              asset_size,
              asset_type
            )
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <PageWithChat>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageWithChat>
    );
  }

  if (!booking) {
    return (
      <PageWithChat>
        <div className="text-center py-8">Booking not found</div>
      </PageWithChat>
    );
  }

  return (
    <PageWithChat>
      <div className="bg-white rounded-[24px] p-12 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#133134]">Booking Details</h1>
          <Badge variant="outline" className="bg-primary/10 text-primary">
            {new Date(booking.check_out_date) > new Date() ? 'Active' : 'Completed'}
          </Badge>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {booking.customer?.name?.split(' ').map(n => n[0]).join('') || '??'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-[#133134]">{booking.customer?.name || 'Unknown'}</h3>
                  <p className="text-sm text-[#3E4238]">{booking.customer?.email || 'No email'}</p>
                </div>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium">Phone:</span> {booking.customer?.phone || 'N/A'}</p>
                <p><span className="font-medium">Address:</span> {booking.customer?.address || 'N/A'}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Reservation Code</p>
                  <p className="text-[#3E4238]">#{booking.id}</p>
                </div>
                <div>
                  <p className="font-medium">Check-in Date</p>
                  <p className="text-[#3E4238]">{new Date(booking.check_in_date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="font-medium">Check-out Date</p>
                  <p className="text-[#3E4238]">{new Date(booking.check_out_date).toLocaleDateString()}</p>
                </div>
                {booking.special_requirements && (
                  <div>
                    <p className="font-medium">Special Requirements</p>
                    <p className="text-[#3E4238]">{booking.special_requirements}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {booking.slot && (
          <Card>
            <CardHeader>
              <CardTitle>Slot Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <p className="font-medium">Slot Name</p>
                  <p className="text-[#3E4238]">{booking.slot.name}</p>
                </div>
                <div>
                  <p className="font-medium">Dock</p>
                  <p className="text-[#3E4238]">{booking.slot.dock || 'N/A'}</p>
                </div>
                {booking.slot.length_ft && booking.slot.width_ft && (
                  <div>
                    <p className="font-medium">Dimensions</p>
                    <p className="text-[#3E4238]">
                      {booking.slot.length_ft}' x {booking.slot.width_ft}'
                    </p>
                  </div>
                )}
                <div>
                  <p className="font-medium">Utilities</p>
                  <p className="text-[#3E4238]">
                    {[
                      booking.slot.electricity_voltage && `${booking.slot.electricity_voltage}V`,
                      booking.slot.has_water && 'Water'
                    ].filter(Boolean).join(', ') || 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {booking.bookings_assets && booking.bookings_assets.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Assets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {booking.bookings_assets.map(({ asset }) => (
                  <div key={asset.id} className="flex items-center justify-between p-4 rounded-lg border border-[#E8EBEB]">
                    <div>
                      <p className="font-medium text-[#133134]">{asset.asset_name}</p>
                      <p className="text-sm text-[#3E4238]">{asset.asset_type}</p>
                    </div>
                    <Badge variant="secondary">{asset.asset_size || 'N/A'}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageWithChat>
  );
}