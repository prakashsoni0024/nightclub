"use client";

export default function AvailabilityCards({ availability }) {
  const tables = [
    {
      label: "REGULAR",
      value: availability.REGULAR,
    },
    {
      label: "VIP",
      value: availability.VIP,
    },
    {
      label: "PREMIUM",
      value: availability.PREMIUM_LOUNGE,
    },
  ];

  return (
    <section className="mb-12">
      <div className="flex items-center gap-3 mb-6">
        <div
          className="
            w-2
            h-10
            rounded-full
            bg-gradient-to-b
            from-pink-500
            to-cyan-400
          "
        />

        <div>
          <p
            className="
              text-xs
              uppercase
              tracking-[0.3em]
              text-pink-400
            "
          >
            Live Status
          </p>

          <h2
            className="
              text-2xl
              sm:text-3xl
              font-black
              uppercase
            "
          >
            Today's Availability
          </h2>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div
            key={table.label}
            className="
              p-6
              rounded-[30px]
              border
              border-white/10
              bg-white/[0.04]
              backdrop-blur-xl
            "
          >
            <p
              className="
                text-gray-400
                uppercase
                tracking-[0.2em]
                text-sm
              "
            >
              {table.label} LEFT
            </p>

            <h2
              className={`
                text-5xl
                font-black
                mt-4
                ${
                  table.value <= 1
                    ? "text-red-500"
                    : "text-white"
                }
              `}
            >
              {table.value}
            </h2>

            {table.value <= 0 && (
              <p className="text-red-500 mt-3">
                SOLD OUT
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}