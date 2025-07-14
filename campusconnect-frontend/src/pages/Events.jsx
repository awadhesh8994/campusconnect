// frontend/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import { getEvents, toggleRSVP } from '../api/eventApi';
import EventCard from '../components/EventCard';

export default function Events() {
  const [events, setEvents] = useState([]);

  // initial load
  useEffect(() => {
    getEvents().then((res) => setEvents(res.data)).catch(console.error);
  }, []);

  // RSVP handler
  const handleRSVP = async (eventId) => {
    const token = localStorage.getItem('token');
    if (!token) return alert('Login required to RSVP');

    try {
      const res = await toggleRSVP(eventId, token);
      setEvents((prev) =>
        prev.map((ev) =>
          ev._id === eventId
            ? { ...res.data, isAttending: !ev.isAttending }
            : ev
        )
      );
    } catch (err) {
      console.error(err);
      alert('Could not RSVP');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((ev) => (
            <EventCard key={ev._id} event={ev} onRSVP={handleRSVP} />
          ))}
        </div>
      )}
    </div>
  );
}