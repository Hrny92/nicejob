'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'nicejob_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Zobrazit pouze pokud uživatel ještě nerozhodl
    if (!localStorage.getItem(STORAGE_KEY)) {
      // Malé zpoždění aby se stránka stihla načíst
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  const save = (value: 'all' | 'necessary') => {
    localStorage.setItem(STORAGE_KEY, value)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Nastavení cookies"
      style={{
        position: 'fixed',
        bottom: 24,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        width: 'min(680px, calc(100vw - 32px))',
        background: '#0B294A',
        border: '1px solid rgba(30,113,201,0.25)',
        borderRadius: 16,
        boxShadow: '0 24px 60px rgba(0,0,0,0.35)',
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        animation: 'cookieSlideUp 0.4s cubic-bezier(0.16,1,0.3,1) both',
      }}
    >
      <style>{`
        @keyframes cookieSlideUp {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }
      `}</style>

      {/* Horní řádek — ikonka + text */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        {/* Cookie ikona */}
        <div style={{
          width: 36, height: 36, borderRadius: 10, flexShrink: 0,
          background: 'rgba(30,113,201,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(30,113,201,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/>
            <circle cx="12" cy="12" r="1" fill="currentColor"/>
            <circle cx="8" cy="10" r="1" fill="currentColor"/>
            <circle cx="14" cy="8" r="1" fill="currentColor"/>
          </svg>
        </div>

        <div>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem', marginBottom: 5 }}>
            Tento web používá cookies
          </p>
          <p style={{ color: 'rgba(255,255,255,0.50)', fontSize: '0.825rem', lineHeight: 1.65 }}>
            Používáme nezbytné cookies pro fungování webu a volitelné pro analytiku a marketing.
            Více informací v{' '}
            <Link href="/cookies" style={{ color: 'rgba(30,113,201,0.9)', textDecoration: 'underline' }}>
              nastavení cookies
            </Link>
            {' '}a{' '}
            <Link href="/gdpr" style={{ color: 'rgba(30,113,201,0.9)', textDecoration: 'underline' }}>
              ochraně osobních údajů
            </Link>.
          </p>
        </div>
      </div>

      {/* Tlačítka */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
        <button
          onClick={() => save('necessary')}
          style={{
            background: 'transparent',
            color: 'rgba(255,255,255,0.45)',
            border: 'none',
            padding: '9px 16px',
            fontSize: '0.825rem',
            fontWeight: 500,
            cursor: 'pointer',
            borderRadius: 999,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
        >
          Jen nezbytné
        </button>

        <Link
          href="/cookies"
          style={{
            background: 'rgba(255,255,255,0.07)',
            color: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(255,255,255,0.12)',
            padding: '9px 18px',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            borderRadius: 999,
            textDecoration: 'none',
            transition: 'background 0.2s',
            display: 'inline-block',
          }}
        >
          Nastavit
        </Link>

        <button
          onClick={() => save('all')}
          style={{
            background: '#be1622',
            color: '#fff',
            border: 'none',
            padding: '9px 20px',
            fontSize: '0.825rem',
            fontWeight: 700,
            cursor: 'pointer',
            borderRadius: 999,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#a01220')}
          onMouseLeave={e => (e.currentTarget.style.background = '#be1622')}
        >
          Přijmout vše
        </button>
      </div>
    </div>
  )
}
