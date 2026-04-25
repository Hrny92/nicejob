'use client'

import Link from 'next/link'
import { useState } from 'react'

type CookieCategory = {
  id: string
  name: string
  description: string
  required: boolean
  examples: string[]
}

const CATEGORIES: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Nezbytné cookies',
    description: 'Tyto cookies jsou nutné pro správné fungování webu. Nelze je vypnout, protože bez nich web nemůže fungovat.',
    required: true,
    examples: ['Uchování stavu relace', 'Bezpečnostní tokeny', 'Preference jazyka'],
  },
  {
    id: 'analytics',
    name: 'Analytické cookies',
    description: 'Pomáhají nám pochopit, jak návštěvníci web používají. Všechna data jsou anonymizovaná a agregovaná.',
    required: false,
    examples: ['Google Analytics (anonymizováno)', 'Počet návštěv a relací', 'Nejnavštěvovanější stránky'],
  },
  {
    id: 'marketing',
    name: 'Marketingové cookies',
    description: 'Používají se k zobrazení relevantních reklam a měření jejich efektivity. Nesdílíme data se třetími stranami.',
    required: false,
    examples: ['LinkedIn Insight Tag', 'Remarketing', 'Konverzní měření'],
  },
]

export default function CookiesPage() {
  const [consent, setConsent] = useState<Record<string, boolean>>({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  const handleSave = () => {
    // V produkci zde uložit do localStorage / cookie
    alert('Nastavení cookies bylo uloženo.')
  }

  const acceptAll = () => {
    setConsent({ necessary: true, analytics: true, marketing: true })
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Hlavička */}
      <div style={{ background: 'linear-gradient(160deg, #050e1d 0%, #0B294A 100%)' }}>
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-16 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors duration-200"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Zpět na web
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622' }} />
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Právní dokumenty
            </span>
          </div>
          <h1 style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#fff',
            lineHeight: 1.1,
          }}>
            Nastavení cookies
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '0.9rem', marginTop: 12 }}>
            Vaše soukromí je pro nás důležité. Zvolte, které cookies povolíte.
          </p>
        </div>
      </div>

      {/* Obsah */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-14 md:py-20">

        <p style={{ color: '#64748b', lineHeight: 1.8, marginBottom: 40 }}>
          Soubory cookies jsou malé textové soubory ukládané ve vašem prohlížeči.
          Pomáhají nám zajistit funkčnost webu, analyzovat návštěvnost a zobrazovat
          relevantní obsah. Svá nastavení můžete kdykoli změnit.
        </p>

        {/* Kategorie */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 40 }}>
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: 14,
                padding: '20px 24px',
                background: '#fff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div>
                  <h3 style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontWeight: 700, color: '#050e1d', fontSize: '1rem', marginBottom: 2 }}>
                    {cat.name}
                  </h3>
                  {cat.required && (
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.15em',
                      textTransform: 'uppercase', color: '#1E71C9',
                    }}>
                      Vždy aktivní
                    </span>
                  )}
                </div>

                {/* Toggle */}
                <button
                  onClick={() => !cat.required && setConsent(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                  aria-label={`${cat.name} ${consent[cat.id] ? 'zapnuto' : 'vypnuto'}`}
                  style={{
                    width: 48,
                    height: 26,
                    borderRadius: 999,
                    border: 'none',
                    cursor: cat.required ? 'not-allowed' : 'pointer',
                    background: consent[cat.id] ? '#1E71C9' : '#e2e8f0',
                    position: 'relative',
                    flexShrink: 0,
                    transition: 'background 0.2s',
                  }}
                >
                  <span style={{
                    position: 'absolute',
                    top: 3,
                    left: consent[cat.id] ? 25 : 3,
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                    transition: 'left 0.2s',
                  }} />
                </button>
              </div>

              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: 12 }}>
                {cat.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {cat.examples.map((ex, i) => (
                  <span key={i} style={{
                    fontSize: '0.75rem',
                    color: '#94a3b8',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: 6,
                    padding: '2px 8px',
                  }}>
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Akční tlačítka */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
          <button
            onClick={acceptAll}
            style={{
              background: '#be1622',
              color: '#fff',
              border: 'none',
              borderRadius: 999,
              padding: '12px 28px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Přijmout vše
          </button>
          <button
            onClick={handleSave}
            style={{
              background: 'transparent',
              color: '#0B294A',
              border: '1.5px solid #0B294A',
              borderRadius: 999,
              padding: '12px 28px',
              fontSize: '0.9rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Uložit nastavení
          </button>
          <button
            onClick={() => setConsent({ necessary: true, analytics: false, marketing: false })}
            style={{
              background: 'transparent',
              color: '#94a3b8',
              border: 'none',
              padding: '12px 0',
              fontSize: '0.875rem',
              cursor: 'pointer',
            }}
          >
            Odmítnout volitelné
          </button>
        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid #e2e8f0', display: 'flex', gap: 24 }}>
          <Link href="/gdpr" className="text-sm hover:underline" style={{ color: '#1E71C9' }}>
            Ochrana osobních údajů
          </Link>
          <Link href="/" className="text-sm hover:underline" style={{ color: '#94a3b8' }}>
            Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </div>
  )
}
