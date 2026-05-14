'use client'

import type { SluzbaItem } from '@/lib/queries'

const pad = (n: number) => String(n).padStart(2, '0')
const LOCAL_FALLBACKS = ['/nabor.jpg', '/headhunting.jpg', '/skoleni.jpg']

export default function ServicesSection({ sluzby = [] }: { sluzby?: SluzbaItem[] }) {
  if (sluzby.length === 0) return null

  return (
    <section
      id="sluzby"
      style={{
        background: 'linear-gradient(145deg, #050e1d 0%, #0B294A 28%, #13467D 55%, #0B294A 80%, #050e1d 100%)',
        padding: 'clamp(5rem, 10vw, 8rem) 0',
        position: 'relative',
      }}
    >
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.18) 1px, transparent 1px)',
        backgroundSize: '38px 38px',
      }} />

      <div className="relative max-w-7xl mx-auto px-8 lg:px-16">

        {/* Label */}
        <div className="flex items-center gap-3 mb-14">
          <div className="w-7 h-px bg-white/30" />
          <span className="text-xs font-semibold tracking-[0.22em] uppercase text-white/50">
            Naše služby
          </span>
        </div>

        {/* Grid služeb — 1 sloupec na mobilu, až 3 na desktopu */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {sluzby.map((s, i) => {
            const imgUrl = s.fotoUrl || LOCAL_FALLBACKS[i % LOCAL_FALLBACKS.length]
            return (
              <div key={s._id} className="flex flex-col">

                {/* Obrázek */}
                <div style={{
                  width: '100%',
                  aspectRatio: '4/3',
                  borderRadius: 16,
                  overflow: 'hidden',
                  marginBottom: '1.75rem',
                  boxShadow: '0 24px 56px rgba(0,0,0,0.45)',
                  flexShrink: 0,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={s.nazev}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>

                {/* Text */}
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm" style={{ color: 'rgba(91,163,245,0.6)' }}>
                      {pad(i + 1)}
                    </span>
                    <div className="h-px w-8" style={{ backgroundColor: 'rgba(91,163,245,0.25)' }} />
                  </div>

                  <h2
                    className="font-black leading-tight mb-4"
                    style={{
                      fontFamily: 'Roboto, system-ui, sans-serif',
                      fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                      color: '#ffffff',
                    }}
                  >
                    {s.nazev}
                  </h2>

                  <p
                    className="leading-relaxed mb-5"
                    style={{
                      fontSize: '0.95rem',
                      color: 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {s.popis}
                  </p>

                  {s.detaily && s.detaily.length > 0 && (
                    <ul className="flex flex-col" style={{ gap: 8 }}>
                      {s.detaily.map((d, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          <span className="rounded-full mt-1.5 shrink-0" style={{ width: 5, height: 5, background: '#1E71C9' }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
