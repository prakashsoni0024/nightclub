import { Ticket, Calendar, ImageIcon, Users } from "lucide-react";

export default function DashboardStats({ bookings, events, gallery }) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-10">

      <Card title="Bookings" value={bookings.length} icon={Ticket} />
      <Card title="Events" value={events.length} icon={Calendar} />
      <Card title="Gallery" value={gallery.length} icon={ImageIcon} />
      <Card
        title="Guests"
        value={bookings.reduce((a, b) => a + Number(b.guests || 0), 0)}
        icon={Users}
      />

    </div>
  );
}

function Card({ title, value, icon: Icon }) {
  return (
    <div className="p-5 border border-white/10 rounded-xl bg-white/5">
      <p className="text-gray-400">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
      <Icon />
    </div>
  );
}