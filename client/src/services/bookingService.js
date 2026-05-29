import axios from "axios";
import API from "./api";

// export const checkAvailability = async (bookingDate, tableType) => {
//   const { data } = await API.post("/booking/check-availability", {
//     bookingDate,
//     tableType,
//   });

//   return data;
// };

export const checkAvailability = async (
  bookingDate,
  tableType
) => {
  try {

    const { data } = await API.post(
      "/bookings/check-availability",
      {
        bookingDate,
        tableType,
      }
    );

    return data;

  } catch (error) {

    console.log(error);

    return {
      success: false,
      isAvailable: false,
    };
  }
};

export const createBooking = async (bookingData) => {
  const res = await API.post("/bookings", bookingData);
  return res.data;
};