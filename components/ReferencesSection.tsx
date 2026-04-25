'use client'

import { useState } from 'react'

const TESTIMONIALS = [
  {
    quote: 'Zdenku mohu s čistým svědomím doporučit. Je velmi pečlivá, upřímná a svoji práci dělá víc než dobře. Kandidáti pro ni nejsou čísla, ale každému se plně věnuje a chce, aby se během náboru cítil dobře. Zároveň se s ní moc dobře plánuji rozvojové aktivity a firemní akce. Je pořád samý nápad a její energie neskutečně dobijí.',
    name:     'Veronika Ž.',
    role:     'HR Business Partner · NET4GAS',
    initials: 'VŽ',
    color:    '#1E71C9',
  },
  {
    quote: 'Spolupráci se Zdeňkou mohu všem vřele doporučit. Má v oblasti náboru perfektní přehled a ráda zkouší různé cesty k dosažení cíle. Nikdy nezůstává stát na místě. K jejím velkým výhodám patří obdivuhodná trpělivost, loajalita a nekonečná chuť vzdělávat se. Každý den má úsměv na tváři a do kolektivu přináší pozitivní atmosféru. Víc takových lidí.',
    name:     'Jana Kružlíková',
    role:     'Spolupracovnice',
    initials: 'JK',
    color:    '#0B294A',
  },
  {
    quote: 'Zdenku jsem poznala při výběru nových kolegů. Oslovilo mne její profesionální jednání. Je strukturovaná, její návrhy dávají smysl a můžu se spolehnout na dodržení termínů a dohod. Zdenka je v komunikaci velmi příjemná, naslouchá, zajímají ji potřeby klientů a dokáže se přizpůsobit situaci, která se rychle mění. Za spolupráci se Zdenkou jsem velmi ráda.',
    name:     'Silvie Michalcová',
    role:     'HR Manager, HR Consultant, Coach',
    initials: 'SM',
    color:    '#13467D',
  },
  {
    quote: 'Se Zdenkou spolupracuji už řadu měsíců a vždy jsem nadšená z její energie, pozitivního přístupu a hlavně profesionality. K řešení problémů přistupuje velmi pragmaticky, v situaci se rychle zorientuje a návrhy k dalšímu postupu téměř sype z rukávu. Díky jejím organizačním schopnostem a pozitivnímu přístupu je spolupráce s ní nejen efektivní, ale i velmi příjemná.',
    name:     'Jana Milfaitova',
    role:     'Sales & HR',
    initials: 'JM',
    color:    '#1E71C9',
  },
  {
    quote: 'Se Zdeňkou spolupracuji již 8 rokem a velmi si vážím její profesionality, spolehlivosti a lidského přístupu. Je vždy maximálně ochotná, vstřícná a dokáže udržovat jasnou, otevřenou a přátelskou komunikaci. Zdeňka má skvělý přehled nejen v recruitingu, ale i v marketingu a komunikaci přes sociální sítě. Mohu ji jednoznačně doporučit jako spolehlivého a férového partnera.',
    name:     'Pavel Janouch',
    role:     'Codexis · dlouhodobý spolupracovník',
    initials: 'PJ',
    color:    '#0B294A',
  },
  {
    quote: 'Zdeňka má vždy vše pod kontrolou s nadhledem jí vlastním. Pečlivě organizuje všechny své úkoly i výzvy — i několik takových projektů najednou. Je charakterní a týmová hráčka. Rozhodně se s ní nebudete nudit při jakékoli kooperaci.',
    name:     'Monika Bérešová',
    role:     'Social Media & Community Manager · Ideappeal',
    initials: 'MB',
    color:    '#13467D',
  },
  {
    quote: 'Zdeňka mě příjemně překvapila svou energičností, se kterou přistupuje k práci. Vím, že se na ni mohu spolehnout s dosažením cílů, které si spolu vytyčíme. Navíc má ode mě plusové body za příjemnou komunikaci.',
    name:     'Kateřina Pokorná',
    role:     'e-Commerce Specialist · Vorwerk',
    initials: 'KP',
    color:    '#1E71C9',
  },
  {
    quote: 'Zdeňka pracuje na stejné pozici jako já a umí skvěle komunikovat, vede velmi příjemné a profesionální pohovory. Je radost s ní spolupracovat. Je zběhlá nejen v náborech, ale v oblasti HR obecně.',
    name:     'Soňa Vančová',
    role:     'Talent Acquisition Specialist · Garrett',
    initials: 'SV',
    color:    '#0B294A',
  },
  {
    quote: 'Paní Kocandová je v oblasti personalistiky velmi aktivní a neustále se v ní vzdělává a pracuje na sobě. Snaží se přemýšlet i o nových směrech a nápadech v oblasti náboru, zejména obchodních zástupců.',
    name:     'Lubomír Brož',
    role:     'Spolupracovník',
    initials: 'LB',
    color:    '#13467D',
  },
  {
    quote: 'Zdeňka je výborná personalistka 👍 mohu jen doporučit.',
    name:     'Pavel Zamecnik',
    role:     'Spolupracovník',
    initials: 'PZ',
    color:    '#1E71C9',
  },
]

const CLIENTS = [
  'NET4GAS', 'Vorwerk', 'Garrett', 'Ideappeal', 'Codexis', 'Atlas Group',
]

export default function ReferencesSection() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setActive(i => (i + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[active]

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
          {/* Label */}
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
            className="text-center animate-fadeIn"
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
            "{t.quote}"
          </blockquote>

          {/* Autor */}
          <div className="flex items-center gap-4 mb-10">
            {/* Avatar */}
            <div style={{
              width: 48, height: 48,
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              flexShrink: 0,
              boxShadow: `0 4px 12px ${t.color}33`,
            }}>
              {t.initials}
            </div>
            <div>
              <p style={{ fontWeight: 700, color: '#050e1d', fontSize: '0.95rem', marginBottom: 2 }}>
                {t.name}
              </p>
              <p style={{ color: '#64748b', fontSize: '0.82rem' }}>
                {t.role}
              </p>
            </div>
          </div>

          {/* Navigace */}
          <div className="flex items-center gap-5">
            {/* Prev */}
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

            {/* Tečky */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
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

            {/* Next */}
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

        {/* ── Loga klientů ─────────────────────────────── */}
        <div className="mt-20 md:mt-24">
          {/* Oddělovač */}
          <div className="flex items-center gap-4 mb-10">
            <div style={{ flex: 1, height: 1, background: 'rgba(30,113,201,0.1)' }} />
            <span style={{ color: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Klienti, kteří nám věří
            </span>
            <div style={{ flex: 1, height: 1, background: 'rgba(30,113,201,0.1)' }} />
          </div>

          {/* Logo row */}
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
            {CLIENTS.map((name, i) => (
              <span
                key={i}
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
                {name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
