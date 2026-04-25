'use client'

import { useContactModal } from '@/context/ContactModalContext'

const STATS = [
  { value: '200+', label: 'Obsazených pozic', sub: 'od vzniku agentury' },
  { value: '98%',  label: 'Spokojenost klientů', sub: 'dle interního průzkumu' },
  { value: '14 dní', label: 'Průměrná doba', sub: 'obsazení role' },
]

const PILLARS = [
  {
    num: '01',
    title: 'Rychlost',
    desc: 'Pohybujeme se rychle. Bez zbytečné byrokracie. Obsadíme roli dříve, než ji obsadí konkurence.',
  },
  {
    num: '02',
    title: 'Transparentnost',
    desc: 'Vždy víte, kde stojíme. Pravidelný reporting, otevřená komunikace, žádné skryté poplatky.',
  },
  {
    num: '03',
    title: 'Lidskost',
    desc: 'Za každou pozicí vidíme skutečného člověka. Kandidáti i klienti jsou pro nás partneři, ne čísla.',
  },
]

export default function WhyUsSection() {
  const { open: openModal } = useContactModal()
  return (
    <section
      id="proc-my"
      className="relative w-full overflow-hidden bg-white"
      style={{ padding: 'clamp(5rem, 10vw, 8rem) 0' }}
    >
      {/* Jemný vzor bodů */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(30,113,201,0.06) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }} />

      {/* Ambientní modrá záře — vpravo nahoře */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(30,113,201,0.07) 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Hlavička ─────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-16 md:mb-20">
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div style={{ width: 28, height: 1, background: 'rgba(30,113,201,0.3)' }} />
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622', flexShrink: 0 }} />
            <span style={{ color: '#64748b', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
              Proč my
            </span>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#be1622', flexShrink: 0 }} />
            <div style={{ width: 28, height: 1, background: 'rgba(30,113,201,0.3)' }} />
          </div>

          {/* Nadpis */}
          <h2 style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
            color: '#050e1d',
            lineHeight: 1.1,
            marginBottom: 8,
          }}>
            Nejsme jen agentura.
          </h2>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
            color: '#1E71C9',
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            Jsme váš partner.
          </p>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: 480 }}>
            Sázíme na data, intuici a moderní technologie.
          </p>
        </div>

        {/* ── Statistiky ────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 mb-20 md:mb-24">
          {STATS.map(({ value, label, sub }, i) => (
            <div key={i} className="flex flex-col items-center md:items-start text-center md:text-left
              md:border-r md:last:border-r-0 md:px-10 first:md:pl-0"
              style={{ borderColor: 'rgba(30,113,201,0.12)' }}>
              <span style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontWeight: 900,
                fontSize: 'clamp(3rem, 7vw, 5rem)',
                color: '#050e1d',
                lineHeight: 1,
                letterSpacing: '-0.02em',
              }}>
                {value}
              </span>
              <span style={{ color: '#0B294A', fontWeight: 700, fontSize: '0.95rem', marginTop: 8, marginBottom: 4 }}>
                {label}
              </span>
              <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{sub}</span>
            </div>
          ))}
        </div>

        {/* ── Pilíře ───────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PILLARS.map(({ num, title, desc }, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-7 transition-all duration-300"
              style={{
                background: '#f8fafc',
                border: '1px solid rgba(30,113,201,0.10)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              }}
            >
              {/* Hover záře */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(30,113,201,0.04) 0%, transparent 60%)' }} />

              {/* Číslo */}
              <span style={{
                display: 'block',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.18em',
                color: '#1E71C9',
                marginBottom: 18,
                textTransform: 'uppercase',
              }}>
                {num}
              </span>

              {/* Název */}
              <h3 style={{
                fontFamily: 'Roboto, system-ui, sans-serif',
                fontWeight: 800,
                fontSize: '1.2rem',
                color: '#050e1d',
                marginBottom: 12,
              }}>
                {title}
              </h3>

              {/* Popis */}
              <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.75 }}>
                {desc}
              </p>

              {/* Spodní modrá linka při hover */}
              <div className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, transparent, rgba(30,113,201,0.4), transparent)' }} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-14">
          <button
            onClick={openModal}
            className="group inline-flex items-center gap-2
                       bg-brand-dark text-white px-7 py-3.5 rounded-full
                       text-sm font-semibold transition-all duration-300
                       hover:bg-brand-mid hover:gap-3"
          >
            Jdem do toho
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
        </div>

      </div>
    </section>
  )
}
