import SibApiV3Sdk from "sib-api-v3-sdk";

const client = SibApiV3Sdk.ApiClient.instance;

client.authentications["api-key"].apiKey =
  process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOwnerBookingEmail = async (booking) => {
  try {
    const result = await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_FROM,
        name: "Nightclub",
      },
      to: [
        {
          email: process.env.OWNER_EMAIL,
        },
      ],
      subject: "New Table Reservation",
      htmlContent: `
        <h2>New Booking Received</h2>

        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Date:</strong> ${booking.bookingDate}</p>
        <p><strong>Table Type:</strong> ${booking.tableType}</p>
        <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
      `,
    });

    console.log("Owner Email Sent", result);
  } catch (error) {
    console.error("Owner Email Error:", error);
  }
};

export const sendCustomerBookingEmail = async (booking) => {
  try {
    const result = await apiInstance.sendTransacEmail({
      sender: {
        email: process.env.EMAIL_FROM,
        name: "Nightclub",
      },
      to: [
        {
          email: booking.email,
        },
      ],
      subject: "Table Reservation Confirmed 🎉",
      htmlContent: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Reservation Confirmed 🎉</h2>

          <p>Hello ${booking.name},</p>

          <p>Your reservation has been confirmed.</p>

          <p><strong>Date:</strong> ${booking.bookingDate}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Table Type:</strong> ${booking.tableType}</p>

          <p>Thank you for choosing us.</p>
        </div>
      `,
    });

    console.log("Customer Email Sent", result);
  } catch (error) {
    console.error("Customer Email Error:", error);
  }
};