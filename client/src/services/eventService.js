import API from "./api";

// GET events
export const getEvents = async () => {
  const res = await API.get("/events");
  return res.data;
};

// CREATE event
export const createEvent = async (data) => {
  const res = await API.post("/events", data);
  return res.data;
};

// DELETE event
export const deleteEvent = async (id) => {
  const res = await API.delete(`/events/${id}`);
  return res.data;
};