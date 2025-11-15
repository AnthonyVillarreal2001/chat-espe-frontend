/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef, useCallback } from 'react';
import socket from '../socket';
import type { Message } from '../types';
import { useParams, useNavigate } from 'react-router-dom';

// Detectar si estamos en ngrok o local
const getSocketUrl = () => {
  const host = window.location.host;
  if (host.includes('ngrok')) {
    // ngrok → apuntar al backend local (tunelizado)
    return 'http://localhost:5000';
  }
  return 'http://localhost:5000';
};

const ChatRoom = () => {
  const { roomId, pin, nickname } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    socket.connect();
    socket.emit('join_room', { room_id: roomId, pin, nickname });

    socket.on('connect', () => setConnected(true));
    socket.on('disconnect', () => setConnected(false));
    socket.on('history', (history: any[]) => {
      setMessages(history.map(m => ({ ...m, type: m.type as 'text' | 'file' })));
    });
    socket.on('message', (msg: any) => {
      setMessages(prev => [...prev, { ...msg, type: 'text' }]);
    });
    socket.on('file', (file: any) => {
      setMessages(prev => [...prev, { ...file, type: 'file' }]);
    });
    socket.on('user_list', setUsers);
    socket.on('error', (data: { msg: string }) => {
      setError(data.msg);
      setTimeout(() => setError(''), 5000);
    });

    return () => {
      socket.off();
      socket.disconnect();
    };
  }, [roomId, pin, nickname]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const sendMessage = () => {
    if (!input.trim() || !connected) return;
    socket.emit('message', { msg: input, timestamp: new Date().toISOString() });
    setInput('');
  };

  const sendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !connected) return;
    if (file.size > 10 * 1024 * 1024) {
      setError('Archivo demasiado grande (máx 10MB)');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      socket.emit('file', {
        file: (reader.result as string).split(',')[1],
        filename: file.name,
        filetype: file.type,
        timestamp: new Date().toISOString()
      });
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <div className="container">
      {error && (
        <div className="error-toast">⚠️ {error}</div>
      )}
      <div className="card">
        <div className="chat-header">
          Sala: <strong>{roomId}</strong> | 👤 <strong>{nickname}</strong> | 📡 {connected ? '🟢' : '🔴'} | 👥 {users.length}
        </div>
        <div className="user-list">
          Conectados: {users.join(', ') || 'Ninguno'}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, i) => (
            <div key={i} className={`message ${msg.username === nickname ? 'own' : 'other'}`}>
              <div className="username">{msg.username}</div>
              {msg.type === 'text' ? (
                <div>{msg.msg}</div>
              ) : (
                <a href={`data:${msg.filetype};base64,${msg.file}`} download={msg.filename} className="file-link">
                  {msg.filename} ({Math.round((msg.file?.length || 0) / 1024)} KB)
                </a>
              )}
              <div className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <input
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && sendMessage()}
            placeholder="Escribe un mensaje..."
            disabled={!connected}
          />
          <div className="input-actions">
            <button className="input-btn attach-btn" onClick={() => fileInputRef.current?.click()} disabled={!connected}>
              📎
            </button>
            <button className="input-btn send-btn" onClick={sendMessage} disabled={!connected || !input.trim()}>
              Enviar
            </button>
          </div>
        </div>
      </div>
      <input type="file" ref={fileInputRef} onChange={sendFile} style={{ display: 'none' }} accept="image/*,.pdf,.doc,.docx,.txt" />
    </div>
  );
};

export default ChatRoom;