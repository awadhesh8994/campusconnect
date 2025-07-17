// frontend/components/EventCard.jsx
import { Link } from "react-router-dom";

export default function EventCard({ event, onRSVP }) {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p className="text-sm text-gray-600">
        {new Date(event.date).toLocaleString()}
      </p>
      <p className="mt-1 text-blue-600">{event.location}</p>

      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="mt-2 w-full h-40 object-cover rounded"
        />
      )}

      <p className="mt-2 text-gray-700 line-clamp-3">{event.description}</p>

      <div className="mt-3 flex items-center gap-3">
        <button
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
          onClick={() => onRSVP(event._id)}
        >
          {event.isAttending ? "Unattend" : "Attend"}
        </button>

        <span className="text-sm text-gray-600">
          {event.attendees?.length || 0} going
        </span>

        <Link
          to={`/events/${event._id}`}
          className="ml-auto bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
        >
          View
        </Link>
      </div>
    </div>
  );
}
