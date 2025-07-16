// socket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL.replace('/api', ''), {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
