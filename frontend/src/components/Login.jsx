import { useState } from 'react';
import axios from 'axios';

export default function Login({ onAuth, onSwitch }) {
  const [form, setForm]   = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const { data } = await axios.post('http://localhost:5001/api/login', form);
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Welcome user!</h1>
      <p style={styles.sub}>Sign in to your account</p>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={submit}>
        <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handle} required />
        <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required />
        <button style={styles.btn} disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
      <p style={styles.link}>No account? <span onClick={onSwitch} style={styles.linkBtn}>Register</span></p>
    </div>
  );
}

const styles = {
  card: { background: '#13131a', border: '1px solid #2a2a3a', borderRadius: 16, padding: '2.5rem', width: 380, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 6 },
  sub: { color: '#6b6b80', marginBottom: 24, fontSize: 14 },
  error: { background: '#2a1a1a', color: '#f64f59', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
  input: { width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', color: '#e8e8f0', padding: '12px 16px', borderRadius: 10, marginBottom: 14, fontSize: 15, outline: 'none' },
  btn: { width: '100%', background: 'linear-gradient(135deg,#6c63ff,#ff6584)', color: '#fff', border: 'none', padding: '13px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
  link: { textAlign: 'center', marginTop: 20, color: '#6b6b80', fontSize: 14 },
  linkBtn: { color: '#6c63ff', cursor: 'pointer', fontWeight: 600 }
};