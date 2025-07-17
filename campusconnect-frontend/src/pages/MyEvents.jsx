// frontend/pages/MyEvents.jsx
import { useEffect, useState } from "react";
import { getMyEvents } from "../api/eventApi";
import EventCard from "../components/EventCard";

export default function MyEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchEvents = async () => {
      try {
        const res = await getMyEvents(token);
        setEvents(res.data);
      } catch (error) {
        console.error("Failed to fetch my events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">You haven’t created any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((ev) => (
            <EventCard key={ev._id} event={ev} onRSVP={() => {}} />
          ))}
        </div>
      )}
    </div>
  );
}
