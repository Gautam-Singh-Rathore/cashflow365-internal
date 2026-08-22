'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { clearSession } from '../lib/auth';

const CATEGORIES = [
  { label: 'Beer', color: '#C9A227', bg: '#FEF9E7' },
  { label: 'Food', color: '#166534', bg: '#ECFDF5' },
  { label: 'Wine', color: '#922B4E', bg: '#FDF2F6' },
  { label: 'Spirits', color: '#7C3AED', bg: '#F5F0FE' },
  { label: 'Personnel Cost', color: '#1D4ED8', bg: '#EEF3FF' }
];

const SUGGESTIONS = [
  'Which category has the best gross margin?',
  'What is the main financial risk right now?',
  'How is Beer performing vs last year?',
  'Compare Wine and Spirits profitability',
  'Is the personnel cost under control?',
  'How is Food trending in 2025?'
];

export default function Chat() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi — I'm the CashFlow365 AI Controller. I can answer questions across Beer, Food, Wine, Spirits, and Personnel Cost using your real 2023–2025 figures. Try one of the questions below, or ask your own."
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, loading]);

  async function send(customQ) {
    const q = customQ || input.trim();
    if (!q || loading) return;

    const nextMessages = [...messages, { role: 'user', content: q }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages })
      });
      const data = await res.json();

      if (!res.ok) {
        setMessages((m) => [...m, { role: 'error', content: data.error || 'Something went wrong.' }]);
      } else {
        setMessages((m) => [...m, { role: 'assistant', content: data.reply }]);
      }
    } catch (err) {
      setMessages((m) => [
        ...m,
        { role: 'error', content: 'Network error — check the deployment and Azure environment variables.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    clearSession();
    router.push('/login');
  }

  return (
    <div style={styles.page} className="gradient-mesh">
      <div style={{ ...styles.orb, ...styles.orbTeal }} className="orb" />
      <div style={{ ...styles.orb, ...styles.orbViolet }} className="orb orb-slow" />

      <div style={styles.shell}>
        <div style={styles.app} className="glass-card fade-in">
          <header style={styles.header}>
            <div style={styles.brand}>
              <div style={styles.logoMark}>
                <IconSpark />
              </div>
              <div>
                <h1 style={styles.h1}>CashFlow365</h1>
                <div style={styles.h1sub}>AI Financial Controller</div>
              </div>
            </div>
            <div style={styles.headerRight}>
              <div style={styles.status}>
                <span style={styles.pulse} className="pulse-dot" />
                <span className="shimmer-text">Live</span>
                <span style={styles.statusDim}>· Azure OpenAI (gpt-4o)</span>
              </div>
              <button className="icon-btn" style={styles.logoutBtn} onClick={handleLogout}>
                <IconLogout />
                Log out
              </button>
            </div>
          </header>

          <div style={styles.modules}>
            {CATEGORIES.map((c) => (
              <div key={c.label} className="category-card" style={{ ...styles.categoryCard, background: c.bg }}>
                <span style={{ ...styles.categoryBar, background: c.color }} />
                <span style={{ ...styles.categoryLabel, color: c.color }}>{c.label}</span>
              </div>
            ))}
          </div>

          <div style={styles.chat} ref={chatRef}>
            {messages.map((m, i) => (
              <Message key={i} role={m.role} content={m.content} />
            ))}
            {loading && (
              <div style={styles.typingRow} className="msg-in">
                <Avatar role="assistant" />
                <div style={styles.typing}>
                  <span style={styles.dotAnim} className="dot-anim" />
                  <span style={{ ...styles.dotAnim, animationDelay: '0.2s' }} className="dot-anim" />
                  <span style={{ ...styles.dotAnim, animationDelay: '0.4s' }} className="dot-anim" />
                </div>
              </div>
            )}
          </div>

          <div style={styles.chips}>
            {SUGGESTIONS.map((s) => (
              <div key={s} className="chip-btn" style={styles.chip} onClick={() => send(s)}>
                <span className="chip-icon" style={styles.chipIcon}>
                  <IconBolt />
                </span>
                {s}
              </div>
            ))}
          </div>

          <div style={styles.inputbar}>
            <input
              className="chat-input"
              style={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about any category, month, or trend..."
            />
            <button className="send-btn" style={styles.button} disabled={loading} onClick={() => send()}>
              <IconSend />
              Send
            </button>
          </div>
          <div style={styles.note}>
            Live — answers are generated by Azure OpenAI (gpt-4o), grounded in the real financial data stored in this app.
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar({ role }) {
  if (role === 'user') {
    return (
      <div style={styles.avatarUser}>
        <IconUser />
      </div>
    );
  }
  return (
    <div style={styles.avatarAi}>
      <IconSpark size={14} />
    </div>
  );
}

function Message({ role, content }) {
  if (role === 'user') {
    return (
      <div style={styles.rowUser} className="msg-in">
        <div style={styles.msgUser}>{content}</div>
        <Avatar role="user" />
      </div>
    );
  }
  if (role === 'error') {
    return (
      <div style={styles.rowAi} className="msg-in">
        <Avatar role="assistant" />
        <div style={styles.msgError}>
          <IconAlert /> {content}
        </div>
      </div>
    );
  }
  return (
    <div style={styles.rowAi} className="msg-in">
      <Avatar role="assistant" />
      <div style={styles.msgAi}>
        <span style={styles.tag}>
          <IconSpark size={10} /> AI CONTROLLER
        </span>
        <div style={{ whiteSpace: 'pre-wrap' }}>{content}</div>
      </div>
    </div>
  );
}

/* ---------------- icons ---------------- */

function IconSpark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
      <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconLogout() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <path d="M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginRight: 5, opacity: 0.55, transition: 'opacity .15s' }}>
      <path d="M13 2 3 14h7l-1 8 11-14h-7l0-6Z" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}

function IconAlert() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, verticalAlign: '-2px' }}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 8v5" />
      <circle cx="12" cy="16" r="0.6" fill="currentColor" />
    </svg>
  );
}

/* ---------------- styles ---------------- */

const styles = {
  page: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '32px 20px',
    overflow: 'hidden'
  },
  orb: { top: 0, left: 0 },
  orbTeal: { width: 460, height: 460, top: -160, left: -120, background: '#14b8a6' },
  orbViolet: { width: 480, height: 480, bottom: -180, right: -160, left: 'auto', top: 'auto', background: '#7c3aed' },
  shell: { position: 'relative', width: '100%', maxWidth: 940, zIndex: 1 },
  app: {
    borderRadius: 26,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
    color: '#0B1F3A',
    minHeight: '85vh'
  },
  header: {
    background: 'linear-gradient(135deg, #0B1F3A 0%, #123a63 55%, #0F2A4A 100%)',
    color: '#fff',
    padding: '22px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap'
  },
  brand: { display: 'flex', alignItems: 'center', gap: 13 },
  logoMark: {
    width: 42,
    height: 42,
    borderRadius: 13,
    background: 'linear-gradient(135deg, #0f766e 0%, #059669 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 8px 18px rgba(15,118,110,0.4)',
    flexShrink: 0,
    color: '#fff'
  },
  h1: { fontSize: 18.5, margin: 0, fontWeight: 800, letterSpacing: 0.2, lineHeight: 1.2 },
  h1sub: { fontSize: 11.5, color: '#9fb3cc', fontWeight: 600, letterSpacing: 0.4, marginTop: 2 },
  headerRight: { display: 'flex', alignItems: 'center', gap: 10 },
  status: {
    fontSize: 12,
    background: 'rgba(52,211,153,0.14)',
    color: '#d1fae5',
    padding: '6px 14px',
    borderRadius: 20,
    border: '1px solid rgba(110,231,183,0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    whiteSpace: 'nowrap',
    fontWeight: 600
  },
  statusDim: { color: '#9fb3cc', fontWeight: 400 },
  pulse: { width: 7, height: 7, borderRadius: '50%', background: '#6ee7b7' },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    fontWeight: 700,
    color: '#e2e8f0',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.16)',
    borderRadius: 20,
    padding: '7px 15px',
    cursor: 'pointer'
  },
  modules: {
    display: 'flex',
    gap: 10,
    padding: '16px 30px',
    background: '#F8FAFC',
    borderBottom: '1px solid #E5E9F0',
    flexWrap: 'wrap'
  },
  categoryCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 14px 8px 10px',
    borderRadius: 12,
    cursor: 'default'
  },
  categoryBar: { width: 4, height: 16, borderRadius: 4 },
  categoryLabel: { fontSize: 12, fontWeight: 700, letterSpacing: 0.2 },
  chat: {
    flex: 1,
    padding: '26px 30px',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 18,
    background:
      'radial-gradient(at 100% 0%, rgba(15,118,110,0.05) 0, transparent 40%), radial-gradient(at 0% 100%, rgba(124,58,237,0.04) 0, transparent 40%), #FBFCFE',
    minHeight: 320
  },
  rowUser: { display: 'flex', alignItems: 'flex-end', gap: 10, alignSelf: 'flex-end', maxWidth: '82%' },
  rowAi: { display: 'flex', alignItems: 'flex-end', gap: 10, alignSelf: 'flex-start', maxWidth: '82%' },
  avatarUser: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0B1F3A, #123a63)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 10px rgba(11,31,58,0.3)'
  },
  avatarAi: {
    width: 32,
    height: 32,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #0F766E, #059669)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 4px 10px rgba(15,118,110,0.35)'
  },
  msgUser: {
    padding: '14px 17px',
    borderRadius: 16,
    background: 'linear-gradient(135deg, #0B1F3A, #17416e)',
    color: '#fff',
    borderBottomRightRadius: 5,
    fontSize: 14.5,
    lineHeight: 1.6,
    boxShadow: '0 6px 16px rgba(11,31,58,0.22)'
  },
  msgAi: {
    padding: '14px 17px',
    borderRadius: 16,
    background: '#fff',
    border: '1px solid #E5E9F0',
    borderBottomLeftRadius: 5,
    fontSize: 14.5,
    lineHeight: 1.6,
    boxShadow: '0 2px 10px rgba(11,31,58,0.06)'
  },
  msgError: {
    padding: '14px 17px',
    borderRadius: 16,
    background: '#FEF2F2',
    border: '1px solid #FCA5A5',
    color: '#7f1d1d',
    fontSize: 14.5,
    borderBottomLeftRadius: 5,
    display: 'flex',
    alignItems: 'center',
    gap: 6
  },
  tag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    fontSize: 10.5,
    fontWeight: 800,
    color: '#0F766E',
    background: '#ECFDF5',
    borderRadius: 6,
    padding: '3px 8px',
    marginBottom: 9,
    letterSpacing: 0.4
  },
  chips: { display: 'flex', flexWrap: 'wrap', gap: 9, padding: '0 30px 16px', background: '#FBFCFE' },
  chip: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 12.5,
    padding: '9px 15px',
    borderRadius: 20,
    border: '1px solid #DCE3EC',
    background: '#fff',
    color: '#0B1F3A',
    cursor: 'pointer',
    fontWeight: 600
  },
  chipIcon: { display: 'flex', alignItems: 'center', opacity: 0.45 },
  inputbar: {
    display: 'flex',
    gap: 10,
    padding: '18px 30px 24px',
    borderTop: '1px solid #E5E9F0',
    background: '#fff'
  },
  input: {
    flex: 1,
    padding: '13px 18px',
    borderRadius: 26,
    border: '1.5px solid #DCE3EC',
    fontSize: 14,
    outline: 'none',
    background: '#F8FAFC'
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: 'linear-gradient(135deg, #0F766E 0%, #059669 100%)',
    color: '#fff',
    border: 'none',
    padding: '0 24px',
    borderRadius: 26,
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: 14,
    boxShadow: '0 8px 18px rgba(15,118,110,0.3)'
  },
  typingRow: { display: 'flex', alignItems: 'flex-end', gap: 10, alignSelf: 'flex-start' },
  typing: {
    display: 'flex',
    gap: 4,
    padding: '15px 17px',
    background: '#fff',
    border: '1px solid #E5E9F0',
    borderRadius: 16,
    borderBottomLeftRadius: 5
  },
  dotAnim: { width: 6, height: 6, borderRadius: '50%', background: '#94a3b8' },
  note: { fontSize: 11, color: '#5b6b7f', textAlign: 'center', padding: '10px 20px 18px', background: '#fff' }
};
