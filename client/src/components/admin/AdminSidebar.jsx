import { Calendar, ImageIcon, LayoutDashboard, LogOut, Ticket } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminSidebar({ activeSection, handleSidebarClick }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const menu = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: Ticket, label: "Bookings" },
    { icon: Calendar, label: "Events" },
    { icon: ImageIcon, label: "Gallery" },
  ];

  return (
    <aside className="w-[270px] min-h-screen border-r border-white/10 bg-white/[0.03] p-6 hidden lg:flex flex-col justify-between">

      <div>
        <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text">
          D'Casa
        </h1>

        <div className="mt-14 space-y-3">
          {menu.map((item, i) => (
            <button
              key={i}
              onClick={() => handleSidebarClick(item.label)}
              className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl border transition-all
                ${
                  activeSection === item.label
                    ? "bg-pink-500/20 border-pink-500"
                    : "border-white/10 hover:bg-pink-500/10"
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-500/20 border border-red-500/20 py-3 rounded-xl"
      >
        <LogOut size={16} /> Logout
      </button>

    </aside>
  );
}