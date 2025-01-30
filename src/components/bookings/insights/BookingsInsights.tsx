import { ChartBar, Clock, MapPin, Users } from "lucide-react";
import { useBookingInsights } from "./useBookingInsights";
import { BookingStatCard } from "./BookingStatCard";
import type { BookingStat } from "./types";

export function BookingsInsights() {
  const { data: insights } = useBookingInsights();

  const stats: BookingStat[] = [
    {
      title: "Total Bookings",
      value: insights?.totalBookings || 0,
      description: "Total bookings this period",
      icon: ChartBar,
    },
    {
      title: "Active Bookings",
      value: insights?.activeBookings || 0,
      description: "Currently active bookings",
      icon: Clock,
    },
    {
      title: "Today's Check-ins",
      value: insights?.todayCheckIns || 0,
      description: "Check-ins scheduled for today",
      icon: MapPin,
    },
    {
      title: "Total Revenue",
      value: `$${(insights?.totalRevenue || 0).toLocaleString()}`,
      description: "Revenue from all bookings",
      icon: Users,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <BookingStatCard key={index} {...stat} />
      ))}
    </div>
  );
}