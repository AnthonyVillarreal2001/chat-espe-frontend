import { io, Socket } from 'socket.io-client';

// Usa variable de entorno o fallback
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const socket: Socket = io(BACKEND_URL, {
  transports: ['websocket'],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;