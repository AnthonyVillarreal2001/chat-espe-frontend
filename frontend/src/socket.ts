import { io, Socket } from 'socket.io-client';

const socket: Socket = io(process.env.BACKEND_URL || 'http://localhost:5000', {
  transports: ['websocket'],
  autoConnect: false,
});

export default socket;