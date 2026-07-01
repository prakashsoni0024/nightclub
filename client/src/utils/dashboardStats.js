import {
  Calendar,
  ImageIcon,
  Ticket,
  Users,
  Wallet,
} from "lucide-react";

export function getDashboardStats(
  bookings = [],
  events = [],
  gallery = []
) {
  const TABLE_PRICES = {
    REGULAR: 3000,
    VIP: 5000,
    PREMIUM_LOUNGE: 10000,
  };

  const totalRevenue = bookings.reduce((acc, booking) => {
    return acc + (TABLE_PRICES[booking.tableType] || 0);
  }, 0);

  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter(
    (booking) => booking.bookingDate === today
  ).length;

  const vipBookings = bookings.filter(
    (booking) => booking.tableType === "VIP"
  ).length;

  const premiumBookings = bookings.filter(
    (booking) => booking.tableType === "PREMIUM_LOUNGE"
  ).length;

  const totalGuests = bookings.reduce(
    (acc, booking) => acc + Number(booking.guests || 0),
    0
  );

  return [
    {
      title: "Bookings",
      value: bookings.length,
      icon: Ticket,
    },
    {
      title: "Revenue",
      value: `₹${totalRevenue}`,
      icon: Wallet,
    },
    {
      title: "Today",
      value: todayBookings,
      icon: Calendar,
    },
    {
      title: "VIP",
      value: vipBookings,
      icon: Users,
    },
    {
      title: "Premium",
      value: premiumBookings,
      icon: Users,
    },
    {
      title: "Events",
      value: events.length,
      icon: Calendar,
    },
    {
      title: "Gallery",
      value: gallery.length,
      icon: ImageIcon,
    },
    {
      title: "Guests",
      value: totalGuests,
      icon: Users,
    },
  ];
}