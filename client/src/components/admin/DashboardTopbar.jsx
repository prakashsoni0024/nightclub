"use client";

import { Menu } from "lucide-react";

export default function DashboardTopbar({
  sidebarOpen,
  setSidebarOpen,
}) {
  return (
    <>
      {/* Mobile Topbar */}
      <div className="flex items-center justify-between lg:hidden mb-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="
            w-12 h-12
            rounded-2xl
            bg-white/[0.05]
            border border-white/10
            flex items-center justify-center
          "
        >
          <Menu />
        </button>

        <h2 className="text-xl font-black tracking-widest">
          D'CASA
        </h2>
      </div>

      {/* Desktop Topbar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 lg:mb-10">
        <div>
          <p
            className="
              uppercase
              tracking-[0.2em] sm:tracking-[0.3em]
              text-pink-400
              text-xs sm:text-sm
              mb-2
            "
          >
            Nightclub Admin
          </p>

          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-black
              uppercase
              leading-tight
              break-words
            "
          >
            Dashboard
          </h1>
        </div>
      </div>
    </>
  );
}