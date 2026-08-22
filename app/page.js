'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Chat from '../components/Chat';
import { hasValidSession } from '../lib/auth';

export default function Home() {
  const router = useRouter();
  const [status, setStatus] = useState('checking'); // checking | authed | redirecting

  useEffect(() => {
    if (hasValidSession()) {
      setStatus('authed');
    } else {
      setStatus('redirecting');
      router.replace('/login');
    }
  }, [router]);

  if (status !== 'authed') {
    return <Splash />;
  }

  return <Chat />;
}

function Splash() {
  return (
    <div style={styles.page} className="gradient-mesh fade-in">
      <div style={{ ...styles.orb, ...styles.orbTeal }} className="orb" />
      <div style={{ ...styles.orb, ...styles.orbViolet }} className="orb orb-slow" />

      <div style={styles.content}>
        <div style={styles.logoMark}>
          <div style={styles.ring} />
          <span style={styles.dollar}>$</span>
        </div>
        <div style={styles.brand}>CashFlow365</div>
        <div style={styles.tagline}>Loading your AI Controller…</div>
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
    overflow: 'hidden'
  },
  orb: { top: 0, left: 0 },
  orbTeal: { width: 420, height: 420, top: -140, left: -100, background: '#14b8a6' },
  orbViolet: { width: 460, height: 460, bottom: -160, right: -140, left: 'auto', top: 'auto', background: '#7c3aed' },
  content: { position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 },
  logoMark: {
    position: 'relative',
    width: 64,
    height: 64,
    borderRadius: 18,
    background: 'linear-gradient(135deg, #0f766e 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 12px 32px rgba(15,118,110,0.45)'
  },
  ring: {
    position: 'absolute',
    inset: -6,
    borderRadius: 22,
    border: '2px solid rgba(52,211,153,0.5)',
    borderTopColor: 'transparent',
    animation: 'spin 1s linear infinite'
  },
  dollar: { color: '#fff', fontSize: 26, fontWeight: 800 },
  brand: { color: '#fff', fontSize: 20, fontWeight: 800, letterSpacing: 0.2, marginTop: 6 },
  tagline: { color: '#9fb3cc', fontSize: 13 }
};
