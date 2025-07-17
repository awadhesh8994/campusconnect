// frontend/api/eventApi.js
import axios from "./axios";

export const getEvents = () => axios.get("/events");
export const getEventById = (id) => axios.get(`/events/${id}`);

export const createEvent = async (formData, token) =>
  axios.post("/events", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

export const toggleRSVP = (id, token) =>
  axios.post(
    `/events/${id}/rsvp`,
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const getMyEvents = (token) =>
  axios.get("/events/my", { headers: { Authorization: `Bearer ${token}` } });
