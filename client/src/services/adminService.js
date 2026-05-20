import API from "./api";

// GET all bookings
export const getBookings = async () => {
  const res = await API.get("/bookings");
  return res.data;
};

// DELETE booking
export const deleteBooking = async (id) => {
  const res = await API.delete(`/bookings/${id}`);
  return res.data;
};