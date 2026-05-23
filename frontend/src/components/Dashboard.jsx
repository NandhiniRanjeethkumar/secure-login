export default function Dashboard({ user, onLogout }) {
  return (
    <div style={styles.card}>
      <div style={styles.avatar}>{user?.username?.[0]?.toUpperCase()}</div>
      <h2 style={styles.title}>Welcome, {user?.username}!</h2>
      <p style={styles.email}>{user?.email}</p>
      <div style={styles.badge}>✓ Authenticated with JWT</div>
      <button style={styles.btn} onClick={onLogout}>Sign Out</button>
    </div>
  );
}

const styles = {
  card: { background: '#13131a', border: '1px solid #2a2a3a', borderRadius: 16, padding: '3rem', width: 380, textAlign: 'center', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' },
  avatar: { width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#6c63ff,#ff6584)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 700, margin: '0 auto 1.5rem' },
  title: { fontFamily: 'Syne, sans-serif', fontSize: 24, fontWeight: 800, marginBottom: 6 },
  email: { color: '#6b6b80', marginBottom: 20, fontSize: 14 },
  badge: { background: '#0d2a1a', color: '#43e97b', padding: '8px 16px', borderRadius: 20, fontSize: 13, display: 'inline-block', marginBottom: 24 },
  btn: { background: 'transparent', border: '1px solid #2a2a3a', color: '#e8e8f0', padding: '10px 28px', borderRadius: 10, cursor: 'pointer', fontSize: 15 }
};