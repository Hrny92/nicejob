'use client'

import { useState } from 'react'
import type { ReferenceItem, KlientItem } from '@/lib/queries'

// Fallback — zobrazí se pokud Sanity ještě nemá data
const FALLBACK_REFS: ReferenceItem[] = []
const FALLBACK_KLIENTI: KlientItem[] = []

export default function ReferencesSection({
  reference = FALLBACK_REFS,
  klienti   = FALLBACK_KLIENTI,
}: {
  reference?: ReferenceItem[]
  klienti?:  KlientItem[]
}) {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + reference.length) % reference.length)
  const next = () => setActive(i => (i + 1) % reference.length)

  const t = reference[active]

  return (
    <section
      id="reference"
      className="relative w-full overflow-hidden bg-white"
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0' }}
    >
      {/* Světlý gradient — nahoře */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(to right, transparent, rgba(30,113,201,0.15), transparent)' }} />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Hlavička ─────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-14 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 28, height: 1, background: 'rgba(30,113,201,0.3)' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622', flexShrink: 0 }} />
            <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Reference
            </span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622', flexShrink: 0 }} />
            <div style={{ width: 28, height: 1, background: 'rgba(30,113,201,0.3)' }} />
          </div>

          <h2 style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            color: '#050e1d',
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            Co o nás říkají
          </h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.7rem, 3.5vw, 2.7rem)',
            color: '#1E71C9',
            lineHeight: 1.2,
          }}>
            klienti, kteří nám věří.
          </p>
        </div>

        {/* ── Testimonial karta ─────────────────────────── */}
        {reference.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-12">
            Reference se načítají ze Sanity CMS. Spusťte seed skript pro vložení dat.
          </p>
        ) : (
          <div className="relative flex flex-col items-center">
            {/* Velké uvozovky */}
            <div className="mb-4" aria-hidden="true" style={{
              fontSize: '5rem',
              lineHeight: 1,
              color: 'rgba(30,113,201,0.12)',
              fontFamily: 'Georgia, serif',
              fontWeight: 900,
              userSelect: 'none',
              marginBottom: -16,
            }}>
              "
            </div>

            {/* Citát */}
            <blockquote
              key={active}
              className="text-center"
              style={{
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: 'clamp(1.05rem, 2.2vw, 1.3rem)',
                color: '#0B294A',
                lineHeight: 1.8,
                maxWidth: 680,
                marginBottom: 36,
              }}
            >
              „{t.citace}"
            </blockquote>

            {/* Autor */}
            <div className="flex items-center gap-4 mb-10">
              <div style={{
                width: 48, height: 48,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${t.barvaAvataru}, ${t.barvaAvataru}cc)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.85rem',
                letterSpacing: '0.05em',
                flexShrink: 0,
                boxShadow: `0 4px 12px ${t.barvaAvataru}33`,
              }}>
                {t.inicialy}
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#050e1d', fontSize: '0.95rem', marginBottom: 2 }}>
                  {t.jmeno}
                </p>
                <p style={{ color: '#64748b', fontSize: '0.82rem' }}>
                  {t.role}
                </p>
              </div>
            </div>

            {/* Navigace */}
            <div className="flex items-center gap-5">
              <button
                onClick={prev}
                aria-label="Předchozí reference"
                className="flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: '1.5px solid rgba(30,113,201,0.25)',
                  background: 'transparent',
                  color: '#1E71C9',
                  cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                {reference.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    aria-label={`Reference ${i + 1}`}
                    style={{
                      height: 3,
                      width: i === active ? 28 : 8,
                      borderRadius: 999,
                      background: i === active ? '#1E71C9' : 'rgba(30,113,201,0.2)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'width 0.3s ease, background 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>

              <button
                onClick={next}
                aria-label="Další reference"
                className="flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{
                  width: 40, height: 40, borderRadius: '50%',
                  border: '1.5px solid rgba(30,113,201,0.25)',
                  background: 'transparent',
                  color: '#1E71C9',
                  cursor: 'pointer',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Loga klientů ─────────────────────────────── */}
        {klienti.length > 0 && (
          <div className="mt-20 md:mt-24">
            <div className="flex items-center gap-4 mb-10">
              <div style={{ flex: 1, height: 1, background: 'rgba(30,113,201,0.1)' }} />
              <span style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                Klienti, kteří nám věří
              </span>
              <div style={{ flex: 1, height: 1, background: 'rgba(30,113,201,0.1)' }} />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
              {klienti.map((k) => (
                k.web ? (
                  <a
                    key={k._id}
                    href={k.web}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'rgba(11,41,74,0.28)',
                      letterSpacing: '0.01em',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    className="hover:!text-[#1E71C9] transition-colors duration-200"
                  >
                    {k.nazev}
                  </a>
                ) : (
                  <span
                    key={k._id}
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'rgba(11,41,74,0.28)',
                      letterSpacing: '0.01em',
                      transition: 'color 0.2s',
                      cursor: 'default',
                    }}
                    className="hover:!text-[#1E71C9] transition-colors duration-200"
                  >
                    {k.nazev}
                  </span>
                )
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  )
}
