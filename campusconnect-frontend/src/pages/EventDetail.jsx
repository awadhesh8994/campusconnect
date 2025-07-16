// frontend/pages/EventDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "../api/eventApi";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEventById(id)
      .then((res) => {
        setEvent(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load event");
        setLoading(false);
      });
  }, [id]);

  if (!event) return <div className="text-center mt-10">Loading…</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-bold">{event.title}</h2>
      <p className="text-gray-600">{new Date(event.date).toLocaleString()}</p>
      <p className="text-blue-600 mb-4">{event.location}</p>

      {event.image && (
        <img src={event.image} alt="" className="rounded mb-4 max-h-96" />
      )}

      <p>{event.description}</p>

      <h3 className="font-semibold mt-6 mb-2">
        Attendees ({event.attendees.length})
      </h3>
      <ul className="list-disc pl-5">
        {event.attendees.map((u) => (
          <li key={u._id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}
