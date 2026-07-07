"use client";

/* React */
import { useState } from "react";

/* Third Party */
import toast, { Toaster } from "react-hot-toast";

/* Hooks */
import useAdminAuth from "@/hooks/admin/useAdminAuth";
import useBookings from "@/hooks/admin/useBookings";
import useEvents from "@/hooks/admin/useEvents";
import useGallery from "@/hooks/admin/useGallery";
import useAvailability from "@/hooks/admin/useAvailability";
import useBookingFilters from "@/hooks/admin/useBookingFilters";


/* Utils */
import { getDashboardStats } from "@/utils/dashboardStats";

/* Components */
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardTopbar from "@/components/admin/DashboardTopbar";
import DashboardStats from "@/components/admin/DashboardStats";
import AvailabilityCards from "@/components/admin/AvailabilityCards";
import BookingFilters from "@/components/admin/BookingFilters";
import BookingsSection from "@/components/admin/BookingsSection";
import EventsSection from "@/components/admin/EventsSection";
import GallerySection from "@/components/admin/GallerySection";
import AccountSettings from "@/components/admin/AccountSettings";


export default function AdminPage() {
  /* Local State */
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [reportPeriod, setReportPeriod] = useState("week");

  /* Custom Hooks */
  const { handleLogout } = useAdminAuth();

  const { bookings, handleDeleteBooking, handleDownloadReport } = useBookings();

  const { availability } = useAvailability();

  const {
    events,
    eventForm,
    setEventForm,
    imageFile,
    setImageFile,
    eventLoading,
    deleteLoading,
    handleEventSubmit,
    handleDeleteEvent,
  } = useEvents();

  const {
    gallery,
    galleryFile,
    setGalleryFile,
    galleryLabel,
    setGalleryLabel,
    galleryLoading,
    galleryDeleteLoading,
    handleGalleryUpload,
    handleDeleteImage,
  } = useGallery();

  const {
    searchTerm,
    setSearchTerm,
    tableFilter,
    setTableFilter,
    dateFilter,
    setDateFilter,
    filteredBookings,
  } = useBookingFilters(bookings);


  /* Dashboard Stats */
  const dashboardStats = getDashboardStats(bookings, events, gallery);

  /* Event Handlers */
  const handleSidebarClick = (label) => {
    setActiveSection(label);

    const section = document.getElementById(label);

    if (!section) return;

    const navbarOffset = 100;

    const offset =
      section.getBoundingClientRect().top + window.pageYOffset - navbarOffset;

    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
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

      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-pink-500/10 blur-[140px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[140px] rounded-full" />

      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="relative z-10 flex">
        <AdminSidebar
          activeSection={activeSection}
          handleSidebarClick={handleSidebarClick}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          handleLogout={handleLogout}
        />

        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10">
          <DashboardTopbar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <DashboardStats stats={dashboardStats} />

          <AvailabilityCards availability={availability} />

          <BookingFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            tableFilter={tableFilter}
            setTableFilter={setTableFilter}
            dateFilter={dateFilter}
            setDateFilter={setDateFilter}
          />

          <BookingsSection
            bookings={filteredBookings}
            handleDeleteBooking={handleDeleteBooking}
            reportPeriod={reportPeriod}
            setReportPeriod={setReportPeriod}
            handleDownloadReport={handleDownloadReport}
          />

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



          <AccountSettings />
        </main>
      </div>
    </div>
  );
}
