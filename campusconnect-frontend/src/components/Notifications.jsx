import { useEffect, useState } from "react";
import { fetchNotifications, markAsRead } from "../api/notificationApi";
import { Link } from "react-router-dom";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications().then((res) => setNotifications(res.data));
  }, []);

  const handleMarkRead = async (id) => {
    await markAsRead(id);
    setNotifications(
      notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
    );
  };

  return (
    <div className="absolute right-0 top-12 bg-white shadow-lg rounded w-80 z-50 border">
      <h3 className="p-3 border-b font-bold">Notifications</h3>
      <ul>
        {notifications.map((note) => (
          <li
            key={note._id}
            className={`p-3 hover:bg-gray-50 ${note.isRead ? "" : "bg-blue-50"}`}
          >
            <Link to={note.link} onClick={() => handleMarkRead(note._id)}>
              {note.message}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
