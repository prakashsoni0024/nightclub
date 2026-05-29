"use client";

import { Trash2 } from "lucide-react";

export default function EventsSection({
  events,
  eventForm,
  setEventForm,
  imageFile,
  setImageFile,
  handleEventSubmit,
  handleDeleteEvent,
  deleteLoading,
  eventLoading,
}) {
  return (
    <div
      id="Events"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 mb-14 lg:mb-20"
    >
      {/* Create Event Form */}
      <div className="p-5 sm:p-8 rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-6 sm:mb-8">
          Create Event
        </h2>

        <form onSubmit={handleEventSubmit} className="space-y-4 sm:space-y-5">
          <input
            placeholder="Event Title"
            value={eventForm.title}
            onChange={(e) =>
              setEventForm({ ...eventForm, title: e.target.value })
            }
            className="w-full p-3 sm:p-4 rounded-2xl bg-black border border-white/10"
          />

          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full p-3 sm:p-4 rounded-2xl bg-black border border-white/10"
          />

          <input
            type="date"
            value={eventForm.date}
            onChange={(e) =>
              setEventForm({ ...eventForm, date: e.target.value })
            }
            className="w-full p-3 sm:p-4 rounded-2xl bg-black border border-white/10"
          />

          <input
            placeholder="Ticket Price"
            value={eventForm.price}
            onChange={(e) =>
              setEventForm({ ...eventForm, price: e.target.value })
            }
            className="w-full p-3 sm:p-4 rounded-2xl bg-black border border-white/10"
          />

          <textarea
            placeholder="Description"
            value={eventForm.description}
            onChange={(e) =>
              setEventForm({ ...eventForm, description: e.target.value })
            }
            className="w-full p-3 sm:p-4 rounded-2xl bg-black border border-white/10 h-28 resize-none"
          />

          <button
            disabled={eventLoading}
            className="w-full py-3 sm:py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 font-bold"
          >
            {eventLoading ? "Creating..." : "Create Event"}
          </button>
        </form>
      </div>

      {/* Events List */}
      <div className="p-5 sm:p-8 rounded-[24px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <h2 className="text-2xl sm:text-3xl font-black uppercase mb-6 sm:mb-8">
          Events
        </h2>

        <div className="space-y-4">
          {events.map((e) => (
            <div
              key={e._id}
              className="
group
flex items-center justify-between
p-5
rounded-[24px]
border border-white/10
bg-white/[0.03]
hover:border-pink-500/30
hover:bg-pink-500/[0.06]
transition-all duration-300
"
            >
              <div>
                <p className="font-semibold">{e.title}</p>
                <p className="text-gray-500 text-sm">{e.date}</p>
              </div>

              <button
                onClick={() => handleDeleteEvent(e._id)}
                className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center"
              >
                {deleteLoading === e._id ? "..." : <Trash2 size={18} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
