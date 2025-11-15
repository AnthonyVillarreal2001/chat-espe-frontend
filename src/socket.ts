import { io, Socket } from 'socket.io-client';

const socket: Socket = io('http://localhost:5000', {
  transports: ['websocket'],        // ← FORZAR WEBSOCKET
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  // NGROK: Cambiar dinámicamente la URL
  // (lo haremos en ChatRoom)
});

export default socket;