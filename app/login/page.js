'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const VALID_EMAIL = 'admin@gmail.com';
const VALID_PASSWORD = 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      setError('');
      setSubmitting(true);
      router.push('/');
      return;
    }

    setError('Invalid email or password.');
  }

  return (
    <div style={styles.page}>
      <div style={styles.glowTop} />
      <div style={styles.glowBottom} />

      <div style={styles.card} className="login-card">
        <div style={styles.brand}>
          <div style={styles.dot} className="pulse-dot" />
          <span style={styles.brandName}>CashFlow365</span>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to access the AI Controller</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Email
            <input
              type="email"
              className="chat-input"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="username"
            />
          </label>

          <label style={styles.label}>
            Password
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                className="chat-input"
                style={{ ...styles.input, paddingRight: 52 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.toggleBtn}
                tabIndex={-1}
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </label>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" className="login-btn" style={styles.button} disabled={submitting}>
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <p style={styles.footer}>Demo access · admin@gmail.com / admin</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
    background: 'radial-gradient(circle at 50% 0%, #16345f 0%, #0B1F3A 45%, #071427 100%)',
    fontFamily: "'Segoe UI', Georgia, sans-serif"
  },
  glowTop: {
    position: 'absolute',
    top: -160,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 520,
    height: 320,
    background: 'radial-gradient(circle, rgba(15,118,110,0.35) 0%, rgba(15,118,110,0) 70%)',
    pointerEvents: 'none'
  },
  glowBottom: {
    position: 'absolute',
    bottom: -180,
    right: -120,
    width: 480,
    height: 480,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, rgba(124,58,237,0) 70%)',
    pointerEvents: 'none'
  },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: 400,
    background: 'rgba(255,255,255,0.98)',
    borderRadius: 20,
    padding: '36px 32px 28px',
    boxShadow: '0 24px 60px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
    backdropFilter: 'blur(6px)'
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 },
  dot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#059669',
    boxShadow: '0 0 8px #059669',
    flexShrink: 0
  },
  brandName: { fontSize: 15, fontWeight: 700, color: '#0B1F3A', letterSpacing: 0.3 },
  title: { fontSize: 24, fontWeight: 700, color: '#0B1F3A', margin: '0 0 6px' },
  subtitle: { fontSize: 13.5, color: '#5b6b7f', margin: '0 0 26px' },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    fontSize: 12.5,
    fontWeight: 600,
    color: '#334155',
    letterSpacing: 0.2
  },
  input: {
    fontFamily: 'inherit',
    fontWeight: 400,
    fontSize: 14.5,
    padding: '12px 14px',
    borderRadius: 10,
    border: '1px solid #CBD5E1',
    outline: 'none',
    color: '#0B1F3A',
    width: '100%'
  },
  passwordWrap: { position: 'relative', display: 'flex' },
  toggleBtn: {
    position: 'absolute',
    right: 6,
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    background: 'none',
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: 600,
    cursor: 'pointer',
    padding: '6px 8px'
  },
  error: {
    fontSize: 13,
    color: '#b91c1c',
    background: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: 10,
    padding: '9px 12px'
  },
  button: {
    marginTop: 4,
    background: 'linear-gradient(135deg, #0F766E 0%, #0d9488 100%)',
    color: '#fff',
    border: 'none',
    padding: '13px 22px',
    borderRadius: 12,
    fontWeight: 700,
    fontSize: 14.5,
    cursor: 'pointer',
    letterSpacing: 0.2,
    boxShadow: '0 6px 16px rgba(15,118,110,0.28)'
  },
  footer: {
    textAlign: 'center',
    fontSize: 11.5,
    color: '#94a3b8',
    marginTop: 22,
    marginBottom: 0
  }
};
