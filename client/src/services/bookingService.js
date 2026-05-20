import API from "./api";

export const createBooking = async (bookingData) => {
  const response = await API.post(
    "/bookings",
    bookingData
  );

  return response.data;
};