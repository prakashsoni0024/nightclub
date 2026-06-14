import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOwnerBookingEmail = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.OWNER_EMAIL,
      subject: "New Table Reservation",
      html: `
        <h2>New Booking Received</h2>

        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Phone:</strong> ${booking.phone}</p>
        <p><strong>Guests:</strong> ${booking.guests}</p>
        <p><strong>Date:</strong> ${booking.bookingDate}</p>
        <p><strong>Table Type:</strong> ${booking.tableType}</p>
        <p><strong>Payment ID:</strong> ${booking.paymentId}</p>
      `,
    });

    console.log("Owner Email Sent");
  } catch (error) {
    console.error("Email Error:", error);
  }
};

export const sendCustomerBookingEmail = async (booking) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: booking.email,
      subject: "Table Reservation Confirmed 🎉",
      html: `
        <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
          <h2>Reservation Confirmed 🎉</h2>

          <p>Hello ${booking.name},</p>

          <p>Your table reservation has been confirmed successfully.</p>

          <hr>

          <h3>Booking Details</h3>

          <p><strong>Name:</strong> ${booking.name}</p>
          <p><strong>Date:</strong> ${booking.bookingDate}</p>
          <p><strong>Guests:</strong> ${booking.guests}</p>
          <p><strong>Table Type:</strong> ${booking.tableType}</p>
          <p><strong>Booking ID:</strong> ${booking._id}</p>

          <hr>

          <p>We look forward to welcoming you.</p>

          <p>Thank you for choosing us.</p>
        </div>
      `,
    });

    console.log("Customer Email Sent");
  } catch (error) {
    console.error("Customer Email Error:", error);
  }
};