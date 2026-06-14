import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_SMTP_KEY,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.log("SMTP Error:", error);
  } else {
    console.log("SMTP Server Ready");
  }
});

console.log("USER:", process.env.BREVO_USER);
console.log("KEY:", process.env.BREVO_SMTP_KEY?.slice(0, 10));

export const sendOwnerBookingEmail = async (booking) => {
  try {
    console.time("owner-email");
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
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

    console.timeEnd("owner-email");
    console.log("Owner Email Sent");
  } catch (error) {
    console.error("Email Error:", error);
  }
};

export const sendCustomerBookingEmail = async (booking) => {
  try {
    console.time("customer-email");
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
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
    console.timeEnd("customer-email");
    console.log("Customer Email Sent");
  } catch (error) {
    console.error("Customer Email Error:", error);
  }
};

export const sendTestEmail = async () => {
  try {
    console.time("Test Email Duration");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.OWNER_EMAIL,
      subject: "Brevo Test",
      html: "<h1>Brevo Working 🚀</h1>",
    });

    console.log("TEST EMAIL SENT");
    console.log(info);
  } catch (error) {
    console.error("TEST EMAIL ERROR:", error);
  }
};
