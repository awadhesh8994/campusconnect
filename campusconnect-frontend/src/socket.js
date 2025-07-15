import { io } from 'socket.io-client';

const socket = io('https://campus-connect-backend-wpxg.onrender.com', {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
});

export default socket;
