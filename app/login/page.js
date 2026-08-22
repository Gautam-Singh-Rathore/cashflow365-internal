'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createSession } from '../../lib/auth';

const VALID_EMAIL = 'admin@gmail.com';
const VALID_PASSWORD = 'admin';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (email.trim().toLowerCase() === VALID_EMAIL && password === VALID_PASSWORD) {
      setError('');
      setSubmitting(true);
      createSession();
      router.push('/');
      return;
    }

    setError('Invalid email or password.');
    setShakeKey((k) => k + 1);
  }

  return (
    <div style={styles.page} className="gradient-mesh">
      <div style={{ ...styles.orb, ...styles.orbTeal }} className="orb" />
      <div style={{ ...styles.orb, ...styles.orbViolet }} className="orb orb-slow" />
      <div style={{ ...styles.orb, ...styles.orbEmerald }} className="orb" />

      <div style={styles.card} className="glass-card login-card">
        <div style={styles.brand}>
          <div style={styles.logoMark}>
            <IconSpark />
          </div>
          <div>
            <span style={styles.brandName}>CashFlow365</span>
            <div style={styles.brandSub}>AI Controller</div>
          </div>
        </div>

        <h1 style={styles.title}>Welcome back</h1>
        <p style={styles.subtitle}>Sign in to access your financial command center</p>

        <form onSubmit={handleSubmit} style={styles.form} key={shakeKey} className={error ? 'shake' : ''}>
          <label style={styles.label}>
            Email
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <IconMail />
              </span>
              <input
                type="email"
                className="chat-input"
                style={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                autoComplete="username"
              />
            </div>
          </label>

          <label style={styles.label}>
            Password
            <div style={styles.inputWrap}>
              <span style={styles.inputIcon}>
                <IconLock />
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                className="chat-input"
                style={{ ...styles.input, paddingRight: 46 }}
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
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <IconEyeOff /> : <IconEye />}
              </button>
            </div>
          </label>

          {error && (
            <div style={styles.error}>
              <IconAlert />
              {error}
            </div>
          )}

          <button type="submit" className="login-btn" style={styles.button} disabled={submitting}>
            {submitting ? (
              <>
                <span className="spin" style={styles.spinner} />
                Signing in…
              </>
            ) : (
              <>
                Sign In
                <IconArrow />
              </>
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>demo access</span>
          <span style={styles.dividerLine} />
        </div>

        <div style={styles.credChip}>
          <code style={styles.credCode}>admin@gmail.com</code>
          <span style={styles.credSep}>/</span>
          <code style={styles.credCode}>admin</code>
        </div>

        <p style={styles.footer}>
          <IconShield /> Secured demo environment · session expires automatically
        </p>
      </div>
    </div>
  );
}

/* ---------------- icons ---------------- */

function IconSpark() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5" />
    </svg>
  );
}

function IconLock() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.2" />
      <path d="M7.5 10.5V7.2a4.5 4.5 0 0 1 9 0v3.3" />
    </svg>
  );
}

function IconEye() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function IconEyeOff() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3l18 18" />
      <path d="M10.6 5.2A10.8 10.8 0 0 1 12 5c6.2 0 10 7 10 7a17.6 17.6 0 0 1-4 4.7M6.6 6.6C4 8.3 2 12 2 12s3.8 7 10 7c1.4 0 2.7-.3 3.8-.8" />
      <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ verticalAlign: '-1.5px', marginRight: 4 }}>
      <path d="M12 2l8 3.5v5.2c0 4.7-3.2 8.7-8 10-4.8-1.3-8-5.3-8-10V5.5L12 2Z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ---------------- styles ---------------- */

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Georgia, sans-serif"
  },
  orb: { top: 0, left: 0 },
  orbTeal: { width: 420, height: 420, top: -140, left: -100, background: '#14b8a6' },
  orbViolet: { width: 460, height: 460, top: '30%', right: -160, left: 'auto', background: '#7c3aed' },
  orbEmerald: { width: 360, height: 360, bottom: -140, left: '20%', top: 'auto', background: '#059669' },
  card: {
    position: 'relative',
    width: '100%',
    maxWidth: 420,
    borderRadius: 28,
    padding: '40px 36px 32px',
    boxShadow: '0 30px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)'
  },
  brand: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    background: 'linear-gradient(135deg, #0f766e 0%, #059669 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 20px rgba(15,118,110,0.35)',
    flexShrink: 0
  },
  brandName: { fontSize: 16.5, fontWeight: 800, color: '#0B1F3A', letterSpacing: 0.2, display: 'block' },
  brandSub: { fontSize: 11.5, color: '#0f766e', fontWeight: 700, letterSpacing: 0.6, textTransform: 'uppercase', marginTop: 1 },
  title: { fontSize: 26, fontWeight: 800, color: '#0B1F3A', margin: '0 0 6px', letterSpacing: -0.3 },
  subtitle: { fontSize: 13.5, color: '#64748b', margin: '0 0 28px', lineHeight: 1.5 },
  form: { display: 'flex', flexDirection: 'column', gap: 18 },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 7,
    fontSize: 12.5,
    fontWeight: 700,
    color: '#334155',
    letterSpacing: 0.2
  },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: {
    position: 'absolute',
    left: 14,
    color: '#94a3b8',
    display: 'flex',
    pointerEvents: 'none'
  },
  input: {
    fontFamily: 'inherit',
    fontWeight: 400,
    fontSize: 14.5,
    padding: '13px 14px 13px 40px',
    borderRadius: 12,
    border: '1.5px solid #E2E8F0',
    outline: 'none',
    color: '#0B1F3A',
    width: '100%',
    background: '#F8FAFC'
  },
  toggleBtn: {
    position: 'absolute',
    right: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'none',
    color: '#94a3b8',
    cursor: 'pointer',
    padding: 8,
    borderRadius: 8
  },
  error: {
    fontSize: 13,
    color: '#b91c1c',
    background: '#FEF2F2',
    border: '1px solid #FCA5A5',
    borderRadius: 10,
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },
  button: {
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: 'linear-gradient(135deg, #0F766E 0%, #059669 100%)',
    color: '#fff',
    border: 'none',
    padding: '14px 22px',
    borderRadius: 14,
    fontWeight: 700,
    fontSize: 15,
    cursor: 'pointer',
    letterSpacing: 0.2,
    boxShadow: '0 10px 24px rgba(15,118,110,0.32)'
  },
  spinner: {
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: '2px solid rgba(255,255,255,0.4)',
    borderTopColor: '#fff',
    display: 'inline-block'
  },
  divider: { display: 'flex', alignItems: 'center', gap: 10, margin: '26px 0 16px' },
  dividerLine: { flex: 1, height: 1, background: '#E2E8F0' },
  dividerText: { fontSize: 10.5, color: '#94a3b8', fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase' },
  credChip: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    background: '#F1F5F9',
    border: '1px dashed #CBD5E1',
    borderRadius: 12,
    padding: '10px 14px'
  },
  credCode: {
    fontFamily: "'Cascadia Code', 'Consolas', monospace",
    fontSize: 12.5,
    color: '#0f766e',
    fontWeight: 600
  },
  credSep: { color: '#cbd5e1' },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 20,
    marginBottom: 0
  }
};
