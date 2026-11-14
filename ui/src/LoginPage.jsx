// src/LoginPage.jsx
// Triggers Keycloak's hosted login page via Authorization Code + PKCE.
// Keycloak's page renders username/password AND any configured Identity
// Providers (Google, etc.) — this React component just kicks off the redirect.
//
// Why no local form: ROPC (the previous grant_type=password approach) cannot
// support social IdPs because Google never hands its users' credentials to a
// third-party form. Auth Code + PKCE delegates auth to Keycloak's UI and
// works for both local and federated users uniformly.
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { loginRedirect } from './api.js'

export default function LoginPage() {
  const location = useLocation()
  const returnTo = location.state?.from?.pathname || '/admin/overview'
  const [error, setError] = useState(null)

  // Auto-redirect on first paint. Wrapped in a tiny delay so React has a
  // chance to render the "Redirecting..." UI before the page navigates away —
  // makes failures (e.g. Keycloak unreachable) visibly debuggable.
  useEffect(() => {
    const t = setTimeout(() => {
      loginRedirect(returnTo).catch(e => setError(e.message || String(e)))
    }, 50)
    return () => clearTimeout(t)
  }, [returnTo])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'var(--void)',
      fontFamily: 'var(--font-body)',
    }}>
      <div aria-hidden="true" style={{
        position: 'absolute', width: 720, height: 720, borderRadius: '50%',
        top: '-18%', left: '50%', transform: 'translateX(-50%)',
        background: 'radial-gradient(circle, rgba(77,48,255,0.38) 0%, rgba(125,134,255,0.12) 45%, transparent 70%)',
        filter: 'blur(40px)',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 400,
        background: 'var(--glass)',
        border: '1px solid var(--glass-border)',
        borderRadius: 24,
        padding: '44px 36px',
        textAlign: 'center',
        backdropFilter: 'blur(18px)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
      }}>
        <div style={{
          width: 48, height: 48, margin: '0 auto 20px', borderRadius: 14,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--accent-gradient)', color: '#fff',
          fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700,
          boxShadow: '0 8px 28px rgba(77,48,255,0.45)',
        }}>
          A
        </div>

        <h1 style={{
          margin: 0, fontSize: '1.75rem', fontWeight: 500, color: '#fff',
          letterSpacing: '-0.03em',
        }}>
          AISPM MVP v1
        </h1>

        {!error && (
          <p style={{ margin: '12px 0 0', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
            Redirecting to sign-in&hellip;
          </p>
        )}

        {error && (
          <>
            <p style={{
              marginTop: 20, padding: '10px 14px',
              background: 'rgba(255,93,61,0.1)', border: '1px solid rgba(255,93,61,0.3)',
              borderRadius: 12, fontSize: '0.875rem', color: '#ff9d8a',
              textAlign: 'left',
            }}>
              {error}
            </p>
            <button
              onClick={() => { setError(null); loginRedirect(returnTo).catch(e => setError(e.message)) }}
              style={{
                marginTop: 16, padding: '12px 28px',
                background: '#fff', color: '#07010d',
                border: 'none', borderRadius: 14,
                fontSize: '0.9375rem', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  )
}
