import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  getBookings,
  deleteBooking,
  downloadBookingReport,
} from "@/services/adminService";

export default function useBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();

      const sorted = data.bookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setBookings(sorted);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id);

      setBookings((prev) =>
        prev.filter((booking) => booking._id !== id)
      );

      toast.success("Booking deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleDownloadReport = async (period) => {
    try {
      const pdf = await downloadBookingReport(period);

      const url = window.URL.createObjectURL(pdf);

      const link = document.createElement("a");

      link.href = url;

      link.download = `booking-report-${period}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download report");
    }
  };

  return {
    bookings,
    setBookings,
    loading,
    fetchBookings,
    handleDeleteBooking,
    handleDownloadReport,
  };
}