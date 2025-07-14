import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket(currentUser, setConversations) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    const socket = io('https://campus-connect-backend-wpxg.onrender.com', {
      auth: { token: localStorage.getItem('token') },
    });

    socket.on('connect', () => {
      socket.emit('addUser', currentUser._id);
    });

    // update conversation list when new message arrives
    socket.on('receiveMessage', (msg) => {
      setConversations((prev) => {
        const idx = prev.findIndex((c) =>
          c.members.some((m) => m._id === msg.senderId || m._id === msg.recipientId)
        );
        if (idx !== -1) {
          const updated = [...prev];
          updated[idx].lastMessage = msg;
          return updated;
        }
        return prev;
      });
    });

    socketRef.current = socket;
    return () => socket.disconnect();
  }, [currentUser, setConversations]);

  return socketRef.current;
}
