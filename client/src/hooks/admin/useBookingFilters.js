import { useMemo, useState } from "react";

export default function useBookingFilters(bookings = []) {
  const [searchTerm, setSearchTerm] = useState("");

  const [tableFilter, setTableFilter] = useState("");

  const [dateFilter, setDateFilter] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesSearch =
        booking.name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        booking.phone?.includes(searchTerm);

      const matchesTable = tableFilter
        ? booking.tableType === tableFilter
        : true;

      const matchesDate = dateFilter
        ? booking.bookingDate === dateFilter
        : true;

      return (
        matchesSearch &&
        matchesTable &&
        matchesDate
      );
    });
  }, [bookings, searchTerm, tableFilter, dateFilter]);

  return {
    searchTerm,
    setSearchTerm,

    tableFilter,
    setTableFilter,

    dateFilter,
    setDateFilter,

    filteredBookings,
  };
}