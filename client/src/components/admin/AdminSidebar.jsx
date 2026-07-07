"use client";
 
import {
  Calendar,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Settings,
  Ticket,
  X,
  UtensilsCrossed,
  FolderOpen,
} from "lucide-react";

export default function AdminSidebar({
  activeSection,
  handleSidebarClick,
  sidebarOpen,
  setSidebarOpen,
  handleLogout,
}) {



const menu = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    icon: Ticket,
    label: "Bookings",
  },
  {
    icon: Calendar,
    label: "Events",
  },
  {
    icon: ImageIcon,
    label: "Gallery",
  },
  {
    icon: FolderOpen,
    label: "Categories",
  },
  {
    icon: UtensilsCrossed,
    label: "Menu Items",
  },
  {
    icon: Settings,
    label: "Settings",
  },
];

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="
            fixed inset-0
            bg-black/70
            backdrop-blur-sm
            z-40
            lg:hidden
          "
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky
          top-0 left-0
          z-50
          h-screen
          w-[280px]
          border-r border-white/10
          bg-[#070707]/95
          backdrop-blur-2xl
          p-6
          flex flex-col justify-between
          transition-all duration-300

          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div>
          <div className="flex items-center justify-between">
            <h1
              className="
                text-3xl
                font-black
                uppercase
                tracking-[0.2em]
                bg-gradient-to-r
                from-pink-500
                to-cyan-400
                bg-clip-text
                text-transparent
              "
            >
              D'Casa
            </h1>

            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
              <X />
            </button>
          </div>

          <div className="mt-14 space-y-3">
            {menu.map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  handleSidebarClick(item.label);
                  setSidebarOpen(false);
                }}
                className={`
                  flex items-center gap-4
                  w-full
                  px-5 py-4
                  rounded-2xl
                  border
                  transition-all duration-300

                  ${
                    activeSection === item.label
                      ? "bg-gradient-to-r from-pink-500/30 to-cyan-500/20 border-pink-500/50 shadow-[0_0_30px_rgba(236,72,153,0.2)]"
                      : "bg-white/[0.03] border-white/10 hover:border-pink-500/40 hover:bg-pink-500/10"
                  }
                `}
              >
                <item.icon size={20} />

                <span className="tracking-wide">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="
            flex items-center justify-center gap-3
            w-full py-4
            rounded-2xl
            bg-red-500/20
            border border-red-500/20
            hover:bg-red-500
            transition-all duration-300
          "
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>
    </>
  );
}
