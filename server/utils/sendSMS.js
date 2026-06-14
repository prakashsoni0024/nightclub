import axios from "axios";

export const sendOwnerSMS = async (booking) => {
  try {
    const message = `
New Booking

Name: ${booking.name}
Phone: ${booking.phone}
Guests: ${booking.guests}
Date: ${booking.bookingDate}
Table: ${booking.tableType}
`;

    await axios.post(
      "https://control.msg91.com/api/v5/flow/",
      {
        flow_id: process.env.MSG91_FLOW_ID,
        sender: "MSGIND",
        mobiles: process.env.OWNER_PHONE,
        message,
      },
      {
        headers: {
          authkey: process.env.MSG91_AUTH_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("SMS Sent");
  } catch (error) {
    console.error(
      "SMS Error:",
      error.response?.data || error.message
    );
  }
};