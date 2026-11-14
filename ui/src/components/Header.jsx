import { useState } from 'react'
import { logout } from '../api.js'

export default function Header({ model, models, onModelChange, onNewChat }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header style={{
      height: 58,
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      gap: 12,
      background: 'rgba(7,1,13,0.94)',
      backdropFilter: 'blur(14px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1, gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: 9,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--accent-gradient)', color: '#fff',
          fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700,
        }}>A</div>
        <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, letterSpacing: '-0.03em', color: '#fff' }}>
          AISPM
        </span>
      </div>

      {/* Model selector */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: 12,
        padding: '5px 12px',
        fontSize: 13,
      }}>
        <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: 11 }}>Model</span>
        <select
          value={model}
          onChange={e => onModelChange(e.target.value)}
          style={{
            border: 'none', background: 'transparent',
            fontSize: 13, color: '#fff',
            cursor: 'pointer', outline: 'none', fontWeight: 500,
          }}
        >
          {models.map(m => <option key={m.id} value={m.id} style={{ color: '#f5f4fa' }}>{m.label}</option>)}
        </select>
      </div>

      {/* New chat */}
      <button
        onClick={onNewChat}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'var(--glass)',
          border: '1px solid var(--glass-border)',
          borderRadius: 12,
          padding: '6px 14px',
          fontSize: 13, fontWeight: 500,
          color: 'rgba(255,255,255,0.7)',
          transition: 'background var(--transition), color var(--transition)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--glass-strong)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'var(--glass)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
      >
        <span style={{ fontSize: 15, lineHeight: 1 }}>+</span>
        New chat
      </button>

      {/* Avatar / logout */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(o => !o)}
          title="Account"
          style={{
            width: 32, height: 32,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #4d30ff, #7d86ff)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, color: '#fff',
            letterSpacing: '0.01em',
            flexShrink: 0,
          }}
        >
          A
        </button>

        {menuOpen && (
          <>
            {/* Backdrop to close on outside click */}
            <div
              style={{ position: 'fixed', inset: 0, zIndex: 199 }}
              onClick={() => setMenuOpen(false)}
            />
            {/* Dropdown */}
            <div style={{
              position: 'absolute', top: 40, right: 0,
              background: '#110b17',
              border: '1px solid var(--border)',
              borderRadius: 10,
              boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
              minWidth: 160,
              zIndex: 200,
              overflow: 'hidden',
            }}>
              <button
                onClick={() => { setMenuOpen(false); logout() }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  width: '100%', padding: '10px 16px',
                  background: 'none', border: 'none',
                  fontSize: 13, color: '#d3d1de',
                  cursor: 'pointer', textAlign: 'left',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#150f1d'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ color: '#8a8799', flexShrink: 0 }}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Log out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
