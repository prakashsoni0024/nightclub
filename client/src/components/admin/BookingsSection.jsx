"use client";

import { Ticket } from "lucide-react";

export default function BookingsSection({ bookings, handleDeleteBooking }) {
  return (
    <div id="Bookings" className="mb-14 lg:mb-20">
      <div className="flex items-center gap-3 mb-6 lg:mb-8">
        <Ticket className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6" />

        <h2 className="text-2xl sm:text-3xl font-black uppercase">
          All Bookings
        </h2>
      </div>
      {/* Mobile Cards */}
      <div className="md:hidden space-y-4 mb-6">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="
        p-5
        rounded-[24px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
      "
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">{b.name}</h3>

              <span
                className="
            px-3 py-1
            rounded-full
            bg-pink-500/10
            text-pink-300
            text-xs
          "
              >
                {b.tableType}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-300">
              <p>📞 {b.phone}</p>

              <p>👥 {b.guests} Guests</p>

              <p>📅 {b.bookingDate}</p>
            </div>

            <button
              onClick={() => handleDeleteBooking(b._id)}
              className="
          mt-5
          w-full
          py-3
          rounded-xl
          bg-red-500/20
          border border-red-500/20
        "
            >
              Delete Booking
            </button>
          </div>
        ))}
      </div>

      <div
        className="
    hidden md:block
    overflow-x-auto
    rounded-[24px]
    border border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
  "
      >
        <table className="w-full min-w-[750px]">
          <thead>
            <tr className="border-b border-white/10 text-gray-400 uppercase text-xs sm:text-sm tracking-[0.2em]">
              <th className="p-4 sm:p-5 text-left">Name</th>
              <th className="p-4 sm:p-5 text-left">Phone</th>
              <th className="p-4 sm:p-5 text-left">Guests</th>
              <th className="p-4 sm:p-5 text-left">Date</th>
              <th className="p-4 sm:p-5 text-left">Table</th>
              <th className="p-4 sm:p-5 text-left">Booked On</th>
              <th className="p-4 sm:p-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((b) => (
              <tr
                key={b._id}
                className="border-b border-white/5 hover:bg-white/[0.03] transition"
              >
                <td className="p-4 sm:p-5 whitespace-nowrap font-medium">
                  {b.name}
                </td>

                <td className="p-4 sm:p-5 whitespace-nowrap">{b.phone}</td>

                <td className="p-4 sm:p-5">{b.guests}</td>

                <td className="p-4 sm:p-5 whitespace-nowrap">
                  {b.bookingDate}
                </td>

                <td className="p-4 sm:p-5 whitespace-nowrap">
                  <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-300 text-xs border border-pink-500/20">
                    {b.tableType}
                  </span>
                </td>

                <td className="p-4 sm:p-5 text-gray-400 text-sm whitespace-nowrap">
                  {new Date(b.createdAt).toLocaleString()}
                </td>

                <td className="p-4 sm:p-5">
                  <button
                    onClick={() => handleDeleteBooking(b._id)}
                    className="bg-red-500/20 border border-red-500/20 hover:bg-red-600 px-3 py-1.5 rounded-lg text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
