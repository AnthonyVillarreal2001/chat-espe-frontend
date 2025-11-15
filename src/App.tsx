import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminPanel from './pages/AdminPanel';
import ChatRoom from './components/ChatRoom';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/chat/:roomId/:pin/:nickname" element={<ChatRoom />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;