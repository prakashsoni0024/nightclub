import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  createEvent,
  deleteEvent,
  getEvents,
} from "@/services/eventService";

import { uploadImage } from "@/services/uploadService";

export default function useEvents() {
  const [events, setEvents] = useState([]);

  const [eventLoading, setEventLoading] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(null);

  const [imageFile, setImageFile] = useState(null);

  const [eventForm, setEventForm] = useState({
    title: "",
    image: "",
    date: "",
    price: "",
    description: "",
  });

  const fetchEvents = async () => {
    try {
      const data = await getEvents();

      setEvents(data.events);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    try {
      setEventLoading(true);

      let imageUrl = "";

      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);

        imageUrl = uploadRes.url;
      }

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
      console.error(error);
      toast.error("Failed to create event");
    } finally {
      setEventLoading(false);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      setDeleteLoading(id);

      await deleteEvent(id);

      await fetchEvents();

      toast.success("Event deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    } finally {
      setDeleteLoading(null);
    }
  };

  return {
    events,
    setEvents,

    eventForm,
    setEventForm,

    imageFile,
    setImageFile,

    eventLoading,

    deleteLoading,

    fetchEvents,

    handleEventSubmit,

    handleDeleteEvent,
  };
}