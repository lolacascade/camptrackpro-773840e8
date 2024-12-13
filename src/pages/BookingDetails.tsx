import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Edit, MessageSquare, Printer, ChevronDown, DollarSign, Users } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function BookingDetails() {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

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
          reservation_code,
          customer:customers(
            id,
            name,
            email,
            phone,
            address,
            lifetime_value
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

  const { data: relatedBookings } = useQuery({
    queryKey: ['related-bookings', booking?.customer?.id],
    enabled: !!booking?.customer?.id,
    queryFn: async () => {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', booking.customer.id)
        .neq('id', booking.id)
        .order('check_in_date', { ascending: false })
        .limit(5);
      return data;
    },
  });

  const getStatusBadgeVariant = (checkOutDate: string) => {
    const now = new Date();
    const checkOut = new Date(checkOutDate);
    return checkOut > now ? 'default' : 'secondary';
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </PageContainer>
    );
  }

  if (!booking) {
    return (
      <PageContainer>
        <div className="text-center py-8">Booking not found</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#133134]">Booking Details</h1>
          <Badge 
            variant={getStatusBadgeVariant(booking.check_out_date)} 
            className="text-base px-4 py-1"
          >
            {new Date(booking.check_out_date) > new Date() ? 'Active' : 'Completed'}
          </Badge>
        </div>

        <Card className="border-2 border-[#133134]/10">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Reservation Code</p>
                <p className="text-xl font-semibold">{booking.reservation_code}</p>
              </div>
              <div className="flex gap-2">
                <Calendar className="h-5 w-5" />
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">
                    {new Date(booking.check_in_date).toLocaleDateString()} - {new Date(booking.check_out_date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {booking.customer?.name?.split(' ').map(n => n[0]).join('') || '??'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-[#133134]">{booking.customer?.name || 'Unknown'}</h3>
                <p className="text-sm text-[#3E4238]">{booking.customer?.email || 'No email'}</p>
                <p className="text-sm text-[#3E4238]">{booking.customer?.phone || 'No phone'}</p>
              </div>
            </div>

            {booking.slot && (
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
            )}

            {booking.special_requirements && (
              <div>
                <p className="font-medium">Special Requirements</p>
                <p className="text-[#3E4238] mt-1">{booking.special_requirements}</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Insights</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Customer Value</p>
                <p className="font-medium">${booking.customer?.lifetime_value?.toLocaleString() || '0'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Booking History</p>
                <p className="font-medium">
                  {relatedBookings?.length 
                    ? `${relatedBookings.length} previous bookings`
                    : 'First-time customer'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {relatedBookings?.length > 0 && (
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <Card>
              <CardHeader className="pb-0">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between w-full cursor-pointer">
                    <CardTitle>Related Bookings</CardTitle>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                  </div>
                </CollapsibleTrigger>
              </CardHeader>
              <CollapsibleContent>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {relatedBookings.map((relatedBooking) => (
                      <div key={relatedBooking.id} className="flex justify-between items-center p-4 rounded-lg border">
                        <div>
                          <p className="font-medium">{relatedBooking.reservation_code}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(relatedBooking.check_in_date).toLocaleDateString()} - {new Date(relatedBooking.check_out_date).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={getStatusBadgeVariant(relatedBooking.check_out_date)}>
                          {new Date(relatedBooking.check_out_date) > new Date() ? 'Active' : 'Completed'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        )}

        <div className="flex justify-end gap-4 mt-8">
          <Button variant="outline" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Contact Customer
          </Button>
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            Print Invoice
          </Button>
          <Button variant="outline" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit Booking
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}