"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

import {
  Calendar,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Plus,
  Ticket,
  Trash2,
  Users,
  Wallet,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { getBookings, deleteBooking } from "@/services/adminService";
import { createEvent, deleteEvent, getEvents } from "@/services/eventService";

import { uploadImage } from "@/services/uploadService";

import {
  uploadGalleryImage,
  getGallery,
  deleteGalleryImage,
} from "@/services/galleryService";

export default function AdminPage() {
  const router = useRouter();

  const [eventLoading, setEventLoading] = useState(false);

  const [galleryLoading, setGalleryLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(null);

  const [galleryDeleteLoading, setGalleryDeleteLoading] = useState(null);

  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);

  const [imageFile, setImageFile] = useState(null);

  const [galleryFile, setGalleryFile] = useState(null);
  const [galleryLabel, setGalleryLabel] = useState("");

  const [eventForm, setEventForm] = useState({
    title: "",
    image: "",
    date: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
    }
  }, []);

  const fetchBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data.bookings);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    const data = await getEvents();
    setEvents(data.events);
  };

  const fetchGallery = async () => {
    const data = await getGallery();
    setGallery(data.images);
  };

  useEffect(() => {
    fetchBookings();
    fetchEvents();
    fetchGallery();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      setEventLoading(true);

      let imageUrl = "";

      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        imageUrl = uploadRes.url;
      }

      console.log({
        ...eventForm,
        image: imageUrl,
      });

      await createEvent({
        ...eventForm,
        image: imageUrl,
      });

      await fetchEvents();

      setEventForm({
        title: "",
        image: "",
        date: "",
        price: "",
        description: "",
      });

      setImageFile(null);

      toast.success("Event created successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to create event");
    } finally {
      setEventLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      setDeleteLoading(id);

      await deleteEvent(id);

      fetchEvents();

      toast.success("Event deleted");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleGalleryUpload = async () => {
    try {
      if (!galleryFile || !galleryLabel) {
        toast.error("Image and label required");
        return;
      }

      setGalleryLoading(true);

      await uploadGalleryImage(galleryFile, galleryLabel);

      setGalleryFile(null);
      setGalleryLabel("");

      fetchGallery();

      toast.success("Image uploaded");
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setGalleryLoading(false);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      setGalleryDeleteLoading(id);

      await deleteGalleryImage(id);

      fetchGallery();

      toast.success("Image deleted");
    } catch (error) {
      toast.error("Delete failed");
    } finally {
      setGalleryDeleteLoading(null);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await deleteBooking(id);

      setBookings((prev) => prev.filter((booking) => booking._id !== id));

      toast.success("Booking deleted");
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white/95 overflow-hidden relative">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#111",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="relative z-10 flex">
        {/* Sidebar */}
        <aside className="w-[270px] min-h-screen border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl p-6 hidden lg:flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-[0.2em] bg-gradient-to-r from-pink-500 to-cyan-400 bg-clip-text text-transparent">
              NOIR
            </h1>

            <div className="mt-14 space-y-3">
              {[
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
              ].map((item, i) => (
                <button
                  key={i}
                  className="
                  flex items-center gap-4
                  w-full
                  px-5 py-4
                  rounded-2xl
                  bg-white/[0.03]
                  border border-white/10
                  hover:border-pink-500/40
                  hover:bg-pink-500/10
                  transition-all duration-300
                  "
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
            w-full
            py-4
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

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-10">
          {/* Topbar */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
            <div>
              <p className="uppercase tracking-[0.3em] text-pink-400 text-sm mb-3">
                Nightclub Admin
              </p>

              <h1 className="text-5xl font-black uppercase leading-none">
                Dashboard
              </h1>
            </div>

          
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-14">
            {[
              {
                title: "Bookings",
                value: bookings.length,
                icon: Ticket,
              },
              {
                title: "Events",
                value: events.length,
                icon: Calendar,
              },
              {
                title: "Gallery",
                value: gallery.length,
                icon: ImageIcon,
              },
              {
                title: "Total Guests",
                value: bookings.reduce(
                  (acc, item) => acc + Number(item.guests || 0),
                  0,
                ),
                icon: Users,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="
                p-6 rounded-[30px]
                border border-white/10
                bg-white/[0.04]
                backdrop-blur-xl
                hover:border-pink-500/30
                hover:shadow-[0_0_40px_rgba(236,72,153,0.2)]
                transition-all duration-300
                "
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm uppercase tracking-[0.2em]">
                      {item.title}
                    </p>

                    <h2 className="text-5xl font-black mt-4">{item.value}</h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500/20 to-cyan-500/20 flex items-center justify-center">
                    <item.icon size={28} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bookings */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <Wallet className="text-pink-500" />
              <h2 className="text-3xl font-black uppercase">Recent Bookings</h2>
            </div>

            <div className="overflow-x-auto rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-gray-400 uppercase text-sm tracking-[0.2em]">
                    <th className="p-5 text-left">Name</th>
                    <th className="p-5 text-left">Phone</th>
                    <th className="p-5 text-left">Guests</th>
                    <th className="p-5 text-left">Date</th>
                    <th className="p-5 text-left">Table</th>
                    <th className="p-5 text-left">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((b) => (
                    <tr
                      key={b._id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition"
                    >
                      <td className="p-5">{b.name}</td>
                      <td className="p-5">{b.phone}</td>
                      <td className="p-5">{b.guests}</td>
                      <td className="p-5">{b.bookingDate}</td>
                      <td className="p-5">{b.tableType}</td>
                      <td className="p-5">
                        <button
                          onClick={() => handleDeleteBooking(b._id)}
                          className=" bg-red-500/20
                      border border-red-500/20 hover:bg-red-600 transition px-4 py-1 rounded-lg"
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

          {/* Create Event */}
          <div className="grid lg:grid-cols-2 gap-10 mb-20">
            <div className="p-8 rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <h2 className="text-3xl font-black uppercase mb-8">
                Create Event
              </h2>

              <form onSubmit={handleEventSubmit} className="space-y-5">
                <input
                  placeholder="Event Title"
                  value={eventForm.title}
                  className="w-full p-4 rounded-2xl bg-black border border-white/10 outline-none"
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      title: e.target.value,
                    })
                  }
                />

                <input
                  type="file"
                  className="w-full p-4 rounded-2xl bg-black border border-white/10"
                  onChange={(e) => setImageFile(e.target.files[0])}
                />

                <input
                  type="date"
                  value={eventForm.date}
                  className="w-full p-4 rounded-2xl bg-black border border-white/10"
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      date: e.target.value,
                    })
                  }
                />

                <input
                  placeholder="Ticket Price"
                  value={eventForm.price}
                  className="w-full p-4 rounded-2xl bg-black border border-white/10"
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      price: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Description"
                  value={eventForm.description}
                  className="w-full p-4 rounded-2xl bg-black border border-white/10 h-32"
                  onChange={(e) =>
                    setEventForm({
                      ...eventForm,
                      description: e.target.value,
                    })
                  }
                />

                <button
                  disabled={eventLoading}
                  className="
  w-full
  py-4
  rounded-2xl
  bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
  text-black/90
  font-bold
  hover:scale-[1.02]
  transition-all duration-300
  disabled:opacity-50
  "
                >
                  {eventLoading ? "Creating Event..." : "Create Event"}
                </button>
              </form>
            </div>

            {/* Events List */}
            <div className="p-8 rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <h2 className="text-3xl font-black uppercase mb-8">Events</h2>

              <div className="space-y-4">
                {events.map((e) => (
                  <div
                    key={e._id}
                    className="
                    flex items-center justify-between
                    p-5 rounded-2xl
                    border border-white/10
                    bg-black/40
                    "
                  >
                    <div>
                      <p className="font-semibold">{e.title}</p>

                      <p className="text-gray-500 text-sm mt-1">{e.date}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteEvent(e._id)}
                      className="
                      w-12 h-12 rounded-xl
                      bg-red-500/20
                      border border-red-500/20
                      flex items-center justify-center
                      hover:bg-red-500
                      transition-all
                      "
                    >
                      {deleteLoading === e._id ? "..." : <Trash2 size={18} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="p-8 rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <h2 className="text-3xl font-black uppercase mb-8">
              Gallery Upload
            </h2>

            <div className="grid lg:grid-cols-3 gap-4 mb-8">
              <input
                type="text"
                placeholder="Image Label"
                value={galleryLabel}
                onChange={(e) => setGalleryLabel(e.target.value)}
                className="p-4 rounded-2xl bg-black border border-white/10"
              />

              <input
                type="file"
                onChange={(e) => setGalleryFile(e.target.files[0])}
                className="p-4 rounded-2xl bg-black border border-white/10"
              />

              <button
                onClick={handleGalleryUpload}
                disabled={galleryLoading}
                className="
  rounded-2xl
  bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400
  text-black/90
  font-bold
  disabled:opacity-50
  "
              >
                {galleryLoading ? "Uploading..." : "Upload"}
              </button>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
              {gallery.map((img) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={img._id}
                  className="
                  relative overflow-hidden
                  rounded-[24px]
                  border border-white/10
                  "
                >
                  <img
                    src={img.imageUrl}
                    alt=""
                    className="w-full h-[300px] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                  <div className="absolute bottom-4 left-4 text-xs tracking-[0.3em] uppercase text-purple-200">
                    <p className="font-semibold">{img.label}</p>
                  </div>

                  <button
                    onClick={() => handleDeleteImage(img._id)}
                    className="
                    absolute top-4 right-4
                    w-7 h-7
                    rounded-xl
                    bg-red-500/60
                      border border-red-500/20 hover:bg-red-600
                    flex items-center justify-center
                    "
                  >
                    {galleryDeleteLoading === img._id ? (
                      "..."
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
