import client from "../config/twilio.js";

// Customer SMS
export const sendCustomerBookingSMS = async (booking
) => {
  try {
    await client.messages.create({
      body: `🎉 DCSA Nightclub

Hi ${booking.name},

Your table booking has been confirmed.

📅 Date: ${booking.bookingDate}
👥 Guests: ${booking.guests}

We look forward to seeing you!

- DCSA Nightclub`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${booking.phone}`,
    });

    console.log("Customer SMS Sent");
  } catch (error) {
    console.error("Customer SMS Error:", error.message);
  }
};

// Owner SMS
export const sendOwnerBookingSMS = async (
booking
) => {
  try {
    await client.messages.create({
      body: `📢 New Table Booking

Name: ${booking.name}
Phone: ${booking.phone}

Date: ${booking.bookingDate}
Guests: ${booking.guests}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+91${process.env.OWNER_PHONE}`,
    });

    console.log("Owner SMS Sent");
  } catch (error) {
    console.error("Owner SMS Error:", error.message);
  }
};