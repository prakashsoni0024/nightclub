"use client";

import jsPDF from "jspdf";

const InvoiceModal = ({ isOpen, onClose, booking }) => {
  if (!isOpen || !booking) return null;

  const downloadInvoice = () => {
    const doc = new jsPDF();

    // ===== TITLE =====
    doc.setFontSize(24);

    doc.setTextColor(30, 30, 30);

    doc.text("D'Casa The Club", 20, 25);

    doc.setFontSize(12);

    doc.setTextColor(120);

    doc.text("Premium Booking Invoice", 20, 33);

    // ===== RIGHT SIDE =====
    doc.setFontSize(10);

    doc.text(`Date: ${new Date().toLocaleDateString()}`, 150, 25);

    doc.setFontSize(9);

    doc.text(`Invoice ID: ${booking.bookingId}`, 190, 32, {
      align: "right",
    });

    // ===== LINE =====
    doc.setDrawColor(220);

    doc.line(20, 42, 190, 42);

    // ===== CUSTOMER INFO =====
    doc.setFontSize(14);

    doc.setTextColor(40);

    doc.text("Customer Details", 20, 58);

    const details = [
      ["Customer Name", booking.name],

      ["Phone Number", booking.phone],

      ["Guests", booking.guests],

      ["Booking Date", booking.bookingDate],

      [
        "Table Type",

        booking.tableType === "PREMIUM_LOUNGE"
          ? "Premium Lounge"
          : booking.tableType,
      ],

      ["Payment ID", booking.paymentId],

      ["Payment Status", "PAID"],
    ];

    let y = 72;

    details.forEach((item) => {
      doc.setFontSize(11);

      doc.setTextColor(120);

      doc.text(item[0], 25, y);

      doc.setTextColor(30);

      doc.text(String(item[1]), 95, y);

      y += 14;
    });

    // ===== TOTAL BOX =====
    doc.setFillColor(245, 245, 245);

    doc.roundedRect(20, y + 10, 170, 28, 4, 4, "F");

    doc.setFontSize(12);

    doc.setTextColor(100);

    doc.text("Total Amount Paid", 30, y + 28);

    doc.setFontSize(24);

    doc.setTextColor(20);

    const rawAmount = String(booking.amount)
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .trim();

    doc.setFontSize(24);

    doc.setTextColor(20);

    const formattedAmount = `Rs. ${Number(booking.amount).toLocaleString(
      "en-IN",
    )}`;

    doc.text(formattedAmount, 145, y + 28);

    // ===== FOOTER =====
    doc.setFontSize(10);

    doc.setTextColor(130);

    doc.text("Thank you for choosing NightClub VIP.", 20, 270);

    doc.text("This invoice confirms your booking payment.", 20, 277);

    // ===== DOWNLOAD =====
    doc.save(`DCasa_Invoice.pdf`);
  };

  return (
    <div
      className="
      fixed inset-0 z-[999]
      flex items-center justify-center
      bg-black/70 backdrop-blur-sm
    "
    >
      <div
        className="
        w-[95%] max-w-lg
        rounded-3xl
        border border-white/10
        bg-[#0f0f0f]
        p-8
        text-white
        shadow-[0_20px_80px_rgba(0,0,0,0.7)]
      "
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Booking Confirmed 🎉</h2>

          <button onClick={onClose} className="text-white/60 hover:text-white">
            ✕
          </button>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Booking ID</span>

            <span>{booking.bookingId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Customer</span>

            <span>{booking.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Phone</span>

            <span>{booking.phone}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Guests</span>

            <span>{booking.guests}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Date</span>

            <span>{booking.bookingDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Table</span>

            <span>{booking.tableType}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Amount</span>

            <span>Rs. {Number(booking.amount).toLocaleString("en-IN")}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Payment ID</span>

            <span className="text-xs">{booking.paymentId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-400">Status</span>

            <span className="text-green-400">PAID</span>
          </div>
        </div>

        <button
          onClick={downloadInvoice}
          className="
          mt-8
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-pink-500
          via-fuchsia-500
          to-cyan-500
          py-4
          font-semibold
        "
        >
          Download Invoice
        </button>
      </div>
    </div>
  );
};

export default InvoiceModal;
