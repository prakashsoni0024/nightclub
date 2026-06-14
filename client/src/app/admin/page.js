"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Menu, X } from "lucide-react";

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
import { verifyAdmin } from "@/services/authService";

import {
  getBookings,
  deleteBooking,
  getAvailabilityStats,
  downloadBookingReport,
} from "@/services/adminService";
import { createEvent, deleteEvent, getEvents } from "@/services/eventService";
import EventsSection from "@/components/admin/EventsSection";
import GallerySection from "@/components/admin/GallerySection";
import BookingsSection from "@/components/admin/BookingsSection";

import { uploadImage } from "@/services/uploadService";

import {
  uploadGalleryImage,
  getGallery,
  deleteGalleryImage,
} from "@/services/galleryService";

export default function AdminPage() {
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("Dashboard");
  const [eventLoading, setEventLoading] = useState(false);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [galleryDeleteLoading, setGalleryDeleteLoading] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [reportPeriod, setReportPeriod] = useState("week");

  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [tableFilter, setTableFilter] = useState("");

  const [dateFilter, setDateFilter] = useState("");

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

  const [availability, setAvailability] = useState({
    REGULAR: 0,
    VIP: 0,
    PREMIUM_LOUNGE: 0,
  });

  const fetchAvailability = async () => {
    try {
      const data = await getAvailabilityStats();

      setAvailability(data.availability);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/admin/login");

          return;
        }

        await verifyAdmin();
      } catch (error) {
        localStorage.removeItem("token");

        router.push("/admin/login");
      }
    };

    checkAdmin();
  }, []);

  const handleDownloadReport = async () => {
    try {
      const pdf = await downloadBookingReport(reportPeriod);

      const url = window.URL.createObjectURL(pdf);

      const link = document.createElement("a");

      link.href = url;

      link.download = `booking-report-${reportPeriod}.pdf`;

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);

      toast.success("Report downloaded successfully");
    } catch (error) {
      console.log(error);

      toast.error("Failed to download report");
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await getBookings();

      const sorted = data.bookings.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setBookings(sorted);
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

  const fetchAllData = async () => {
    try {
      setLoading(true);

      await Promise.all([
        fetchBookings(),
        fetchEvents(),
        fetchGallery(),
        fetchAvailability(),
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();

    const interval = setInterval(() => {
      fetchAllData();
    }, 10000);

    return () => clearInterval(interval);
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

  const handleSidebarClick = (label) => {
    setActiveSection(label);

    const section = document.getElementById(label);

    if (section) {
      const navbarOffset = 100; // navbar height

      const sectionPosition =
        section.getBoundingClientRect().top + window.pageYOffset;

      const offsetPosition = sectionPosition - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const totalRevenue = bookings.reduce((acc, booking) => {
    const prices = {
      REGULAR: 3000,
      VIP: 5000,
      PREMIUM_LOUNGE: 10000,
    };

    return acc + (prices[booking.tableType] || 0);
  }, 0);

  const todayBookings = bookings.filter((booking) => {
    const today = new Date().toISOString().split("T")[0];

    return booking.bookingDate === today;
  }).length;

  const vipBookings = bookings.filter(
    (booking) => booking.tableType === "VIP",
  ).length;

  const premiumBookings = bookings.filter(
    (booking) => booking.tableType === "PREMIUM_LOUNGE",
  ).length;

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.phone?.includes(searchTerm);

    const matchesTable = tableFilter ? booking.tableType === tableFilter : true;

    const matchesDate = dateFilter ? booking.bookingDate === dateFilter : true;

    return matchesSearch && matchesTable && matchesDate;
  });

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

    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
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

              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden"
              >
                <X />
              </button>
            </div>

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

        {/* Main Content */}
        <main
          className="
    flex-1
    min-w-0
    p-4 sm:p-6 lg:p-10
  "
        >
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

            <h2 className="text-xl font-black tracking-widest">D'CASA</h2>
          </div>
          {/* Topbar */}
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

          {/* Stats Cards */}
          <div
            id="Dashboard"
            className="
    grid
    grid-cols-2
    xl:grid-cols-4
    gap-3 sm:gap-4
    mb-10 lg:mb-12
  "
          >
            {[
              {
                title: "Bookings",
                value: bookings.length,
                icon: Ticket,
              },

              {
                title: "Revenue",
                value: `₹${totalRevenue}`,
                icon: Wallet,
              },

              {
                title: "Today",
                value: todayBookings,
                icon: Calendar,
              },

              {
                title: "VIP",
                value: vipBookings,
                icon: Users,
              },

              {
                title: "Premium",
                value: premiumBookings,
                icon: Users,
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
                title: "Guests",
                value: bookings.reduce(
                  (acc, item) => acc + Number(item.guests || 0),
                  0,
                ),
                icon: Users,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="
        group
        relative
        p-4 sm:p-5
        rounded-[22px]
        border border-white/10
        bg-white/[0.03]
        backdrop-blur-xl
        hover:border-pink-500/30
        hover:bg-white/[0.05]
        transition-all duration-300
        overflow-hidden
      "
              >
                {/* Glow */}
                <div
                  className="
          absolute inset-0
          opacity-0 group-hover:opacity-100
          transition duration-500
          bg-gradient-to-br
          from-pink-500/10
          via-transparent
          to-cyan-500/10
        "
                />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="min-w-0">
                    <p
                      className="
              text-[10px]
              sm:text-xs
              uppercase
              tracking-[0.18em]
              text-gray-400
            "
                    >
                      {item.title}
                    </p>

                    <h2
                      className="
              text-2xl
              sm:text-3xl
              font-black
              mt-2
              leading-none
              break-words
            "
                    >
                      {item.value}
                    </h2>
                  </div>

                  <div
                    className="
            w-11 h-11
            sm:w-12 sm:h-12
            rounded-2xl
            bg-gradient-to-br
            from-pink-500/15
            to-cyan-500/15
            border border-white/10
            flex items-center justify-center
            shrink-0
          "
                  >
                    <item.icon size={20} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Availability Stats */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div
                className="
        w-2 h-10
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
          text-white/95
          uppercase
        "
                >
                  Today's Availability
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
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
              ].map((table, i) => (
                <div
                  key={i}
                  className="
          p-6
          rounded-[30px]
          border border-white/10
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

            ${table.value <= 1 ? "text-red-500" : "text-white"}
          `}
                  >
                    {table.value}
                  </h2>

                  {table.value <= 0 && (
                    <p className="text-red-500 mt-3">SOLD OUT</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Filters */}
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
          text-white/95
          uppercase
        "
                >
                  Booking Filters
                </h2>
              </div>
            </div>

            <div
              className="
      grid
      md:grid-cols-3
      gap-4
    "
            >
              {/* SEARCH */}
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

              {/* TABLE FILTER */}
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

              {/* DATE FILTER */}
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

          {/* Bookings */}
          <BookingsSection
            bookings={filteredBookings}
            handleDeleteBooking={handleDeleteBooking}
            reportPeriod={reportPeriod}
            setReportPeriod={setReportPeriod}
            handleDownloadReport={handleDownloadReport}
          />

          {/* Events */}
          <EventsSection
            events={events}
            eventForm={eventForm}
            setEventForm={setEventForm}
            imageFile={imageFile}
            setImageFile={setImageFile}
            handleEventSubmit={handleEventSubmit}
            handleDeleteEvent={handleDeleteEvent}
            deleteLoading={deleteLoading}
            eventLoading={eventLoading}
          />

          {/* Gallery */}
          <GallerySection
            gallery={gallery}
            galleryLabel={galleryLabel}
            setGalleryLabel={setGalleryLabel}
            galleryFile={galleryFile}
            setGalleryFile={setGalleryFile}
            handleGalleryUpload={handleGalleryUpload}
            galleryLoading={galleryLoading}
            handleDeleteImage={handleDeleteImage}
            galleryDeleteLoading={galleryDeleteLoading}
          />
        </main>
      </div>
    </div>
  );
}
