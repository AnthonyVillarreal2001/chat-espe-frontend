import CreateRoom from '../components/CreateRoom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');

  return (
    <div className="container">
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#667eea', marginBottom: '10px' }}>Panel de Administración</h2>
        <button onClick={() => navigate('/')} style={{
          width: 'auto',
          padding: '10px 20px',
          marginBottom: '20px',
          borderRadius: '25px',
          background: '#dc3545',
          color: 'white'
        }}>
          Cerrar Sesión
        </button>
        {roomId && (
          <div style={{
            background: '#d4edda',
            color: '#155724',
            padding: '15px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '2px solid #c3e6cb'
          }}>
            <strong>Última sala creada:</strong><br/>
            <span style={{ fontSize: '1.5rem', color: '#28a745' }}>
              {roomId}
            </span>
          </div>
        )}
      </div>
      <CreateRoom onRoomCreated={setRoomId} />
    </div>
  );
};

export default AdminPanel;