import { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

export default function App() {
  const [page, setPage]   = useState('login');
  const [user, setUser]   = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      const u = JSON.parse(localStorage.getItem('user') || 'null');
      if (u) { setUser(u); setPage('dashboard'); }
    }
  }, []);

  const handleAuth = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setToken(token); setUser(user); setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null); setUser(null); setPage('login');
  };

  if (page === 'dashboard') return <Dashboard user={user} onLogout={handleLogout} />;
  if (page === 'register') return <Register onAuth={handleAuth} onSwitch={() => setPage('login')} />;
  return <Login onAuth={handleAuth} onSwitch={() => setPage('register')} />;
}
