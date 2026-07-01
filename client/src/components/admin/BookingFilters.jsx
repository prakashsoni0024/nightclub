"use client";

export default function BookingFilters({
  searchTerm,
  setSearchTerm,
  tableFilter,
  setTableFilter,
  dateFilter,
  setDateFilter,
}) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-2 h-10
            rounded-full
            bg-gradient-to-b
            from-cyan-400
            to-pink-500
          "
        />

        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-cyan-400
            "
          >
            Search & Sort
          </p>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-black
              uppercase
              text-white/95
            "
          >
            Booking Filters
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search name or phone"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            p-4
            rounded-2xl
            bg-white/[0.04]
            border border-white/10
            outline-none
            focus:border-pink-500
          "
        />

        {/* Table */}
        <select
          value={tableFilter}
          onChange={(e) => setTableFilter(e.target.value)}
          className="
            p-4
            rounded-2xl
            bg-black
            border border-white/10
            outline-none
            focus:border-pink-500
          "
        >
          <option value="">All Tables</option>
          <option value="REGULAR">Regular</option>
          <option value="VIP">VIP</option>
          <option value="PREMIUM_LOUNGE">Premium Lounge</option>
        </select>

        {/* Date */}
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="
            p-4
            rounded-2xl
            bg-white/[0.04]
            border border-white/10
            outline-none
            focus:border-pink-500
          "
        />
      </div>
    </div>
  );
}