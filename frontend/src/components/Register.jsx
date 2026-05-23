import { useState } from 'react';
import axios from 'axios';

// Password strength checker logic
function getStrength(pw) {
  let score = 0;
  if (pw.length >= 8)  score++;
  if (pw.length >= 12) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score; // 0-5
}

const LABELS = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very strong'];
const COLORS = ['#f64f59', '#f64f59', '#f7971e', '#f7971e', '#43e97b', '#43e97b'];

export default function Register({ onAuth, onSwitch }) {
  const [form, setForm]   = useState({ username: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const strength = getStrength(form.password);

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError('Passwords do not match');
    if (strength < 2) return setError('Password is too weak');
    setLoading(true); setError('');
    try {
      const { data } = await axios.post('http://localhost:5001/api/register', {
        username: form.username, email: form.email, password: form.password
      });
      onAuth(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div style={styles.card}>
      <h1 style={styles.title}>Create Account</h1>
      <p style={styles.sub}>Join us today</p>
      {error && <div style={styles.error}>{error}</div>}
      <form onSubmit={submit}>
        <input style={styles.input} name="username" placeholder="Username" value={form.username} onChange={handle} required />
        <input style={styles.input} name="email" type="email" placeholder="Email" value={form.email} onChange={handle} required />
        <input style={styles.input} name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required />

        {/* Password Strength Bar */}
        {form.password && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 6 }}>
              {[1,2,3,4,5].map(i => (
                <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= strength ? COLORS[strength] : '#2a2a3a', transition: 'background 0.3s' }} />
              ))}
            </div>
            <p style={{ fontSize: 12, color: COLORS[strength] }}>{LABELS[strength]}</p>
            <ul style={{ fontSize: 12, color: '#6b6b80', marginTop: 4, paddingLeft: 16 }}>
              <li style={{ color: form.password.length >= 8 ? '#43e97b' : '#6b6b80' }}>At least 8 characters</li>
              <li style={{ color: /[A-Z]/.test(form.password) ? '#43e97b' : '#6b6b80' }}>One uppercase letter</li>
              <li style={{ color: /[0-9]/.test(form.password) ? '#43e97b' : '#6b6b80' }}>One number</li>
              <li style={{ color: /[^A-Za-z0-9]/.test(form.password) ? '#43e97b' : '#6b6b80' }}>One special character</li>
            </ul>
          </div>
        )}

        <input style={styles.input} name="confirm" type="password" placeholder="Confirm Password" value={form.confirm} onChange={handle} required />
        <button style={styles.btn} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
      </form>
      <p style={styles.link}>Have an account? <span onClick={onSwitch} style={styles.linkBtn}>Sign In</span></p>
    </div>
  );
}

const styles = {
  card: { background: '#13131a', border: '1px solid #2a2a3a', borderRadius: 16, padding: '2.5rem', width: 400, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 28, fontWeight: 800, marginBottom: 6 },
  sub: { color: '#6b6b80', marginBottom: 24, fontSize: 14 },
  error: { background: '#2a1a1a', color: '#f64f59', padding: '10px 14px', borderRadius: 8, marginBottom: 16, fontSize: 14 },
  input: { width: '100%', background: '#0a0a0f', border: '1px solid #2a2a3a', color: '#e8e8f0', padding: '12px 16px', borderRadius: 10, marginBottom: 14, fontSize: 15, outline: 'none' },
  btn: { width: '100%', background: 'linear-gradient(135deg,#6c63ff,#ff6584)', color: '#fff', border: 'none', padding: '13px', borderRadius: 10, fontSize: 16, fontWeight: 600, cursor: 'pointer', marginTop: 4 },
  link: { textAlign: 'center', marginTop: 20, color: '#6b6b80', fontSize: 14 },
  linkBtn: { color: '#6c63ff', cursor: 'pointer', fontWeight: 600 }
};
