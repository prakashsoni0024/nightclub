import API from "./api";

// GET all bookings
export const getBookings = async () => {
  const res = await API.get("/bookings");
  return res.data;
};

// DELETE booking
export const deleteBooking = async (id) => {
  const token = localStorage.getItem("token");

  const res = await API.delete(
    `/bookings/${id}`,

    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

// GET availability stats
export const getAvailabilityStats = async () => {
  const res = await API.get("/bookings/availability-stats");

  return res.data;
};

// DOWNLOAD BOOKING REPORT PDF
export const downloadBookingReport = async (
  period,
) => {
  const token = localStorage.getItem("token");

  const res = await API.get(
    `/bookings/report?period=${period}`,
    {
      responseType: "blob",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};
