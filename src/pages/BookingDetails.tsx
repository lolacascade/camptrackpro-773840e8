
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useBooking } from "@/features/bookings/hooks/use-booking";
import { BookingDrawer } from "@/components/bookings/drawer/BookingDrawer";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageWithChat } from "@/components/layout/PageWithChat";

export default function BookingDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { booking, isLoading, error } = useBooking(id);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !booking) {
    return <div>Error loading booking details</div>;
  }

  return (
    <PageWithChat>
      <PageContainer>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/app/bookings')}
              className="text-[#133134] hover:text-[#133134]/80 -ml-2"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Bookings
            </Button>
            <Button onClick={() => setIsDrawerOpen(true)}>
              Edit Booking
            </Button>
          </div>

          <Card className="p-6">
            <div className="grid gap-4">
              <div>
                <h3 className="text-lg font-medium">Customer Information</h3>
                <div className="mt-2">
                  <p>{booking.customer?.first_name} {booking.customer?.last_name}</p>
                  <p>{booking.customer?.email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium">Booking Details</h3>
                <div className="mt-2">
                  <p>Check-in: {new Date(booking.check_in).toLocaleDateString()}</p>
                  <p>Check-out: {new Date(booking.check_out).toLocaleDateString()}</p>
                  <p>Status: {booking.status}</p>
                  <p>Total Amount: ${booking.total_amount}</p>
                </div>
              </div>

              {booking.special_requirements && (
                <div>
                  <h3 className="text-lg font-medium">Special Requirements</h3>
                  <p className="mt-2">{booking.special_requirements}</p>
                </div>
              )}
            </div>
          </Card>

          <BookingDrawer
            booking={booking}
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
            onBookingUpdated={() => {
              setIsDrawerOpen(false);
            }}
          />
        </div>
      </PageContainer>
    </PageWithChat>
  );
}
