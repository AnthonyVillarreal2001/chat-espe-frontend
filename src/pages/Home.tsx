import AdminLogin from '../components/AdminLogin';
import UserJoin from './UserJoin';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="header">
        <h1>Chat Seguro ESPE</h1>
        <p style={{ fontSize: '1.2rem' }}>Sistema de Salas Seguras en Tiempo Real</p>
      </div>
      <div className="flex">
        <AdminLogin onLogin={() => navigate('/admin')} />
        <UserJoin />
      </div>
    </div>
  );
};

export default Home;